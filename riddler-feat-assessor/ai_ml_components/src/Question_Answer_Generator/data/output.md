#

# Decision Trees Lecture

# Lecture 7 - Decision Trees

|Contents|
|---|
|1 Learning Goals|3|
|2 Examples of Decision Trees|3|
|3 Definition and Classifying an Example|7|
|3.1 What is a decision tree?|7|
|3.2 Classifying an example using a decision tree|7|
|4 The Decision Tree Learning Algorithm|8|
|4.1 Issues in learning a decision tree|8|
|4.2 Grow a full tree given an order of testing features|8|
|4.3 When do we stop?|11|
|4.4 Base case 2: no features left|11|
|4.5 Base case 3: no examples left|13|
|4.6 Pseudo-code for the decision tree learner algorithm|15|
|5 Determine the Order of Testing Features|16|
|5.1 Which feature should we test at each step?|16|
|5.2 Identifying the most important feature|16|
|5.3 Entropy of a distribution over two outcomes|17|
|5.4 Expected information gain of testing a feature|19|
|5.5 A full example|20|
|6 Real-Valued Features|26|
|6.1 Jeeves dataset with real-valued temperatures|26|
|6.2 Handling a discrete feature|27|
|6.3 Handling a real-valued feature|28|
|6.4 Choosing a split point for a real-valued feature|28|
|7 Over-fitting|31|
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Table of Contents

|Section|Title|Page|
|---|---|---|
|7.1|Corrupted data in the Jeeves dataset|31|
|7.2|Dealing with over-fitting with pruning|33|

# Practice Problems

Page 36

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# CS 486/686 - Lecture 7

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees.

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL         OR            COOL
COOL?
EASY                                   HIPSTER
OR           HARD        HIPSTER         OR
HARD?                                   SEXY?
PHONETICS               EASY
OR                   OR
GRAMMAR?              HARD?
EASY  PHONETICS GRAMMAR     EASY    HARD     SEXY
INPUT
MANDARIN                    RUSSIAN
HOLA                 ZHISU               SALUT
SPANISH      JAPANESE       SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# CS 486/686 Lecture 7

# Example: What kind of pet is right for you?

|Do you want a pet to love and care for?|YES|NO|
|---|---|---|
|Are you sure you have a pet?|NO|YES|
|Do you want a pet that returns your affection?|YES|NO|
|Do you want to train your pet to do things?|YES|NO|
|Do you have an open field?|YES| |

| |GIRAFFE|CAT|DOG|FISH|ROCK|
|---|---|---|---|---|---|
|How do you want your pet to think of you?| | |SLAVE|MASTER| |

&copy; Alice Gao 2021 - v1.0 - Page 4 of 36
---
#
# CS 486/686 Lecture 7

Example:
Should you use emoji in a conversation?

Should I Use Emoji (Are Over 20 Years Old)?
No

Over 9 Years Old, Are You:
No

Over 65 Years Old:
No

Is His Work Related?
No

Do You Work in a Tech/Design Field?
Is It a Serious Matter?

Are You Into Geekery?
No

Being Over 30, Will You:
No

Are You Trying to Get Fired?
No

Great Idiot 66 20 MinvieKill
MI
---
#

# Lecture 7

# Running Example

We will use the following example as a running example in this unit:

Training Set

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

14
Rain
Mild
High
Strong
No

Test Set

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Mild
High
Strong
No

2
Rain
Hot
Normal
Strong
No

3
Rain
Cool
High
Strong
No

4
Overcast
Hot
High
Strong
Yes

5
Overcast
Cool
Normal
Weak
Yes

6
Rain
Hot
High
Weak
Yes

7
Overcast
Mild
Normal
Weak
Yes

8
Overcast
Cool
High
Weak
Yes

9
Rain
Cool
High
Weak
Yes

10
Rain
Mild
Normal
Strong
No

11
Overcast
Mild
High
Weak
Yes

12
Sunny
Mild
Normal
Weak
Yes

13
Sunny
Cool
High
Strong
No

14
Sunny
Cool
High
Weak
No
---
#

# Decision Tree Lecture Summary

# CS 486/686 - Lecture 7

# 3.1 What is a decision tree?

A decision tree is a simple model for supervised classification. It is used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature. The edges are labeled wip pe values of pat input feature. Each leaf node specifies a value for pe target feature.

# 3.2 Classifying an example using a decision tree

Classifying an example using a decision tree is intuitive. We traverse down pe tree, evaluating each test and following pe corresponding edge. When a leaf is reached, we return pe classification on pat leaf.

Example: Using pe emoji decision tree:

- I am 30 years old.
- This is work related.
- I am an accountant.
- I am not trying to get fired.

Following pe tree, we answer: no (not under 20 years old), no (not over 65 years old), yes (work related), no (not working in tech), and no (not trying to get fired). The leaf we reach is a pumb down, meaning we should not use emoji.

Problem: If we convert a decision tree to a program, what does it look like?

Solution: A decision tree corresponds to a program wip a big nested if-pen-else structure.

&copy; Alice Gao 2021 - v1.0 - Page 7 of 36
---
#

# Decision Tree Learning Algorithm

# CS 486/686 - Lecture 7

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

How can we build a decision tree given a data set? First, we need to decide on an order of testing the input features. Next, given an order of testing the input features, we can build a decision tree by splitting the examples whenever we test an input feature.

Let’s take a look at the Jeeves training set again. Each row is an example. There are 14 examples. For each example, we have five feature values: day, outlook, temperature, humidity, and wind. Day is not a useful feature since it’s different for every example. So, we will focus on the other four input features. We have one target feature or label, which is whether Bertie decided to play tennis or not.

The decision tree is a powerful and flexible model. Given a data set, we can generate many different decision trees. Therefore, there are a few questions we need to think about when deciding which tree we should build.

- Which order of testing the input features should we use?
- Should we grow a full tree or stop growing the tree earlier?

# 4.2 Grow a full tree given an order of testing features

Let’s go through an example of constructing the full tree using the Jeeves training set. I’ve given you an order of testing the input features below.

Order of Testing Features
1. Outlook
2. Temperature
3. Humidity
4. Wind

&copy; Alice Gao 2021 - v1.0 - Page 8 of 36
---
#

# Decision Tree Construction

# Decision Tree Construction

Order of Testing Features
1. Test Outlook
2. For Outlook = Sunny, test Temp
3. For Outlook = Rain, test Wind
4. For oper branches, test Humidity before testing Wind

# Solution:

Here is the process to generate the decision tree by the given order:

1. We have 9 positive and 5 negative examples. They are not in the same class, so we will have to choose a feature to test.
2. Based on the given order, we will test Outlook first. Outlook has three values: Sunny, Overcast, and Rain. We split the examples into three branches.
3. The three sets look like this. Example 1 has Outlook equal to Sunny, so it goes into the left branch. Example 3 has Outlook equal to Overcast, so it goes into the middle branch, etc.

&copy; Alice Gao 2021 - v1.0 - Page 9 of 36
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# CS 486/686 Lecture 7

Question 1: What decision is made in pe middle branch where all examples are positive?

Answer: A leaf node wip pe label Yes is created.

Question 2: In pe left branch wip two positive and pree negative examples, what feature is tested next?

Answer: The feature Temp is tested next.

Question 3: How many values does pe feature Temp have?

Answer: Temp has pree values - Hot, Mild, and Cool.

Question 4: What is done if all examples at a node are in pe same class?

Answer: A leaf node wip pe class label is created and pe process stops.
---
#

# Decision Tree Lecture

# Decision Tree Lecture

# Final Decision Tree

| |Temp|Yes|Wind|
|---|---|---|---|
|No|Humidity|Yes|Yes|No|
| |No|Yes| |

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made and the process is completed.

# Base Case 2: No Features Left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

# Problem Statement

If the training set has been modified to include 17 examples instead of the original 14, let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

&copy; Alice Gao 2021 - v1.0 - Page 11 of 36
---
#

# Questions and Answers

# Questions and Answers

Question
Answer

After testing Humidity is High, what should we do next?
Continue testing Wind as the next feature. When Wind is Strong, the decision is Yes. When Wind is Weak, the examples are mixed, so no deterministic decision can be made.

What should we do in case we run out of features to test?
When no more features are available to test, options include predicting the majority class or making a randomized decision. In this case, the majority decision is No.

How can noisy data affect decision-making in a data set?
Noisy data, where examples with the same input features have different labels, can lead to uncertainty in decision-making even when all input features are known. This uncertainty may arise from unobserved factors influencing the decision.
---
#

# Questions and Answers

# Questions and Answers

Question
Answer

1. What should be done if there are no examples left as the stopping criteria in decision tree construction?
Base case 3: no examples left. In this case, the decision tree construction process should stop.

2. Complete one branch of the decision tree where Temperature is Hot, Wind is Weak, and Humidity is High.

Day
Outlook
Temp
Humidity
Wind
Tennis?

3
Overcast
Hot
High
Weak
Yes
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case
Decision

If Outlook is Sunny
No

If Outlook is Overcast
Yes

If Outlook is Rain
No examples left

Question: What should be done when there are no examples left for a specific combination of input feature values?

Answer: One approach is to look for examples at the parent node that are closest to the case in question and make a decision based on those examples, which may involve using the majority decision or a random draw from a probability distribution.

|Feature Values|Decision|
|---|---|
|Temperature: Hot|Wind: Weak|Humidity: High|Outlook: Rain|No examples in dataset|

Question: How should such cases be handled when no examples exist for a specific combination of feature values?

Answer: By looking at examples at the parent node that are closest to the case in question and making a decision based on those examples, potentially using the majority decision or a random draw from a probability distribution.
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. return pe class label.
3. else if no features left pen
4. return pe majority decision.
5. else if no examples left pen
6. return pe majority decision at pe parent node.
7. else
8. choose a feature f .
9. for each value v of feature f do
10. build edge wip label v.
11. build sub-tree using examples where pe value of f is v.

Here is the pseudocode for the algorithm. Since a tree is recursive, we will naturally use a recursive algorithm to build it.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7

# CS 486/686 - Lecture 7

# 5. Determine pe Order of Testing Features

# 5.1 Which feature should we test at each step?

In machine learning, overfitting can be a critical issue when building decision trees. To avoid overfitting, we aim to build a simple model wip minimal features. The optimal order of testing features is computationally expensive to find, so a greedy and myopic approach is used. This approach selects features pat make pe biggest difference to classification or help in making quick decisions.

# 5.2 Identifying pe most important feature

To identify pe most important feature, we look for pe one pat reduces uncertainty pe most. This reduction in uncertainty is measured by calculating pe information content of a feature, which is determined by pe difference in uncertainty before and after testing pe feature. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples.
---
#

# Entropy Calculation Questions

# Entropy Calculation Questions

Problem
Options

What is the entropy of the distribution (0.5, 0.5)?
- (A) 0.2
- (B) 0.4
- (C) 0.6
- (D) 0.8
- (E) 1

Solution
The correct answer is (E).

Entropy Calculation
Performing the calculation, we have: -(0.5 log2(0.5)) × 2 = 1 The entropy is 1 bit.

Additional Information
You might be wondering, is one bit of entropy a lot or very little? You will get a better idea of this after question 2. For now, believe me when I say that there is a lot of uncertainty in this binary distribution. This should make intuitive sense. This distribution is uniform. A uniform distribution has a lot of uncertainty since every outcome is equally likely to become true.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
- (A) 0.02
- (B) 0.04
- (C) 0.06
- (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 − p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 − p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass — one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let’s consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Here is the plot of the distribution’s entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Document

# CS 486/686 Lecture 7

Question
What are the maximum and minimum entropy for a distribution with three outcomes?

Answer
The maximum entropy for a distribution with three outcomes occurs when all outcomes are equally likely, resulting in entropy of log2(3) ≈ 1.585. The minimum entropy for a distribution with three outcomes occurs when one outcome has probability 1 and the others have probability 0, resulting in entropy of 0.

# 5.4 Expected information gain of testing a feature

I have discussed how to measure the uncertainty of a distribution using entropy. The next question is, how can we quantify the information content of a feature?

Consider a feature with k values, v1 to vk. There are p positive examples and n negative examples before testing this feature. After testing this feature, we divide the examples into k sets. For each feature value v, let’s suppose that the set has pi positive examples and nii negative examples.

The information content of a feature is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature. Formally, we call this the expected information gain of testing this feature.

Formula for calculating the expected information gain:

Before testing the feature, we have p positive and n negative examples. Let’s convert this to a binary distribution: Yes has a probability of p / (p + n), and No has a probability of n / (p + n). We can calculate the entropy of this distribution using the formula:

Ibefore = I( pp + n,p + nn )

After testing the feature, we have k distributions, one for each of the k feature values. To calculate the entropy of k distributions, we use the concept of expected information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives

Hbefore = -(9/14 log2(9/14) + 5/14 log2(5/14)) = -(14(-0.637) + 14(-1.485)) / (9 + 5) = -(-0.939) ≈ 0.94

© Alice Gao 2021 - v1.0 - Page 20 of 36
---
|Problem: What is the expected information gain if we select Outlook as the root node of the tree? - (A) 0.237
- (B) 0.247
- (C) 0.257
- (D) 0.267
- (E) 0.277
|
|---|
|Solution: Testing Outlook yields three branches:<br/>|Sunny|2+ 3− 5 total|
|Outlook = Rain|Overcast|4+ 0− 4 total|
| | |3+ 2− 5 total|

The expected information gain is:

Gain(Outlook) = 0.94 − (5(1/4 · I(2, 3) + 1/4 · I(4, 0) + 1/4 · I(3, 2)))

= 0.94 − 1/4(0.971) + 1/4(0) + 1/4(0.971)

= 0.94 − 0.694

= 0.247

The correct answer is (B).

Problem: What is the expected information gain if we select Humidity as the root node of the tree?

- (A) 0.151
- (B) 0.251
---
#

# Lecture 7

# Lecture 7

Question
Options

What is the expected information gain for testing Humidity?
(A) 0.151 (B) 0.251 (C) 0.351 (D) 0.451 (E) 0.551

Comparing Outlook and Humidity, which feature has a greater expected information gain?
(A) Outlook (B) Humidity (C) Temperature (D) Wind

For the root node, which feature has the greatest expected information gain?

(A) Outlook

(B) Humidity

(C) Temperature

(D) Wind
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp
Hot

Gain(Temp)
0.57

Humidity
High: + (9, 11), - (1, 2, 8) Normal: + (9, 11), - (1, 2, 8)

Gain(Humidity)
0.97

Wind
Weak: + (9), - (11) Strong: + (1, 8), - (2)

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

Case 2
Outlook = Overcast

Positive Examples
3, 7, 12, 13

Negative Examples

&copy; Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# CS 486/686 - Lecture 7

|Case|Outlook|Temp|Humidity|Wind|
|---|---|---|---|---|
|3|Rain|Hot|Cool|Weak|

# Information Gain Calculation:

|Attribute|Gain|
|---|---|
|Temp|0.019|
|Humidity|0.019|
|Wind|0.97|

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

©cAlice Gao 2021 - v1.0 - Page 24 of 36
---
#

# Lecture 7 - Outlook

# Outlook

Sunny
Overcast
Rain

+
9, 11
3, 7, 12, 13
4, 5, 10

-
1, 2, 8

6, 14

# Humidity

High
Normal

+

9, 11

-
1, 2, 8

# Wind

Weak
Strong

+
4, 5, 10

-

6, 14

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

&copy; Alice Gao 2021 - v1.0 - Page 25 of 36
---
#

# Lecture 7 - Real-Valued Features

# CS 486/686 - Lecture 7

# Real-Valued Features

# Jeeves dataset with real-valued temperatures

So far, the decision tree learner algorithm only works when all of the features have discrete values. In the real world, we are going to encounter a lot of data sets where many features have continuous values, or they’re real-valued. Let’s see how decision trees can handle them.

# Example: A more realistic Jeeves dataset with real-valued temperatures

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
29.4
High
Weak
No

2
Sunny
26.6
High
Strong
No

3
Overcast
28.3
High
Weak
Yes

4
Rain
21.1
High
Weak
Yes

5
Rain
20.0
Normal
Weak
Yes

6
Rain
18.3
Normal
Strong
No

7
Overcast
17.7
Normal
Strong
Yes

8
Sunny
22.2
High
Weak
No

9
Sunny
20.6
Normal
Weak
Yes

10
Rain
23.9
Normal
Weak
Yes

11
Sunny
23.9
Normal
Strong
Yes

12
Overcast
22.2
High
Strong
Yes

13
Overcast
27.2
Normal
Weak
Yes

14
Rain
21.7
High
Strong
No

Instead of having the temperature being a discrete feature, having three values: Mild, Hot, and Cool, we will use actual numbers for Temperature.

# Jeeves dataset ordered by temperatures

For convenience, we will reorder the data set based on the value of the Temperature.

&copy; Alice Gao 2021 - v1.0 - Page 26 of 36
---
#

# Lecture 7

# Day Outlook Temp Humidity Wind Tennis?

Day
Outlook
Temp
Humidity
Wind
Tennis?

7
Overcast
17.7
Normal
Strong
Yes

6
Rain
18.3
Normal
Strong
No

5
Rain
20.0
Normal
Weak
Yes

9
Sunny
20.6
Normal
Weak
Yes

4
Rain
21.1
High
Weak
Yes

14
Rain
21.7
High
Strong
No

8
Sunny
22.2
High
Weak
No

12
Overcast
22.2
High
Strong
Yes

10
Rain
23.9
Normal
Weak
Yes

11
Sunny
23.9
Normal
Strong
Yes

2
Sunny
26.6
High
Strong
No

13
Overcast
27.2
Normal
Weak
Yes

3
Overcast
28.3
High
Weak
Yes

1
Sunny
29.4
High
Weak
No

# Handling a discrete feature

Before seeing how we can handle real-valued features, let’s review how we can handle a discrete feature. We considered two options:

- Allow multi-way splits:
- The tree becomes more complex than just if-then-else.
- The tree tends to be shallower.
- The expected information gain metric prefers a variable with a larger domain, because when a variable has a larger domain we can split the data points into more sets, and there’s a higher chance to reduce entropy.
- Restrict to binary splits:
- The tree is simpler and more compact.
- The tree tends to be deeper.

Example: As an extreme example, pretend that Day is an additional input feature in the Jeeves dataset, then the expected information gain for splitting on day must be the largest. Since we have one example for each day, and we can make a deterministic decision right away after splitting on day. However, it clearly does not make sense to use day as a feature, as the resulting tree does not generalize to any other data sets.

&copy; Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# 6.3 Handling a real-valued feature

- Discretize pe feature (i.e., put pe examples into buckets).
- Allow multi-way splits.
- Restrict to binary splits.

We will limit ourselves to binary splits.

# 6.4 Choosing a split point for a real-valued feature

A na¨ıve way to choose a split point is to first sort pe instances by pe real-valued feature and consider each midpoint of two different consecutive values as a possible split point. Then, we would calculate pe expected information gain of each possible split point and pick one wip pe greatest expected information gain.

However, pere may be too many possible points to consider if we use pis mepod.

A smarter approach:

1. Sort pe instances according to pe real-valued feature.
2. Possible split points are values pat are midway between two adjacent values pat are different.
3. If pere exists a label a ∈ LX and a label b ∈ LY such pat a ≠ b, pen (X + Y)/2 is a possible split point.

Example: Wip pe modified Jeeves data set from before, pere are 11 possible split points using pe na¨ıve mepod.

© Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

|Problem|For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?|
|---|---|
|(A) Yes|(B) No|
|Solution|This is not a possible split point: L20.0 = {Yes} and L20.6 = {Yes}.|
|Correct Answer|(B)|

|Problem|For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?|
|---|---|
|(A) Yes|(B) No|
|Solution|This is a possible split point: L21.1 = {Yes} and L21.7 = {No}.|
|Correct Answer|(A)|

|Problem|For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?|
|---|---|
|(A) Yes|(B) No|
---
#

# Lecture 7

# CS 486/686 - Lecture 7

|Question:|What is a possible split point mentioned in the lecture?|
|---|---|
|Answer:|L21.7 = {No} and L22.2 = {No, Yes}|

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 - v1.0 - Page 30 of 36
---
#

# Lecture 7: Over-fitting

# Lecture 7: Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several advantages in supervised machine learning, such as simplicity, ease of understanding, and interpretability.

When the need arises to explain a model to others, decision trees are preferred over neural networks due to their complexity and interpretability issues. Decision trees can also provide reasonable models even with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the benefits of decision trees, over-fitting remains a challenge during the construction process.

# Example: The Jeeves dataset

The Jeeves dataset consists of 14 data points, making it extremely small. However, a reasonable decision tree can still be learned from this dataset.

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

3
Overcast
Hot
High
Weak
Yes

4
Rain
Mild
High
Weak
Yes

5
Rain
Cool
Normal
Weak
Yes

6
Rain
Cool
Normal
Strong
No

7
Overcast
Cool
Normal
Strong
Yes

8
Sunny
Mild
High
Weak
No

9
Sunny
Cool
Normal
Weak
Yes

10
Rain
Mild
Normal
Weak
Yes

11
Sunny
Mild
Normal
Strong
Yes

12
Overcast
Mild
High
Strong
Yes

13
Overcast
Hot
Normal
Weak
Yes

14
Rain
Mild
High
Strong
No

Decision tree generated by the learner algorithm:

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Decision Tree Example

# Decision Tree Example

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

3
Overcast
Hot
High
Weak
No

4
Rain
Mild
High
Weak
Yes

5
Rain
Cool
Normal
Weak
Yes

6
Rain
Cool
Normal
Strong
No

7
Overcast
Cool
Normal
Strong
Yes

8
Sunny
Mild
High
Weak
No

9
Sunny
Cool
Normal
Weak
Yes

10
Rain
Mild
Normal
Weak
Yes

11
Sunny
Mild
Normal
Strong
Yes

12
Overcast
Mild
High
Strong
Yes

13
Overcast
Hot
Normal
Weak
Yes

14
Rain
Mild
High
Strong
No

Decision tree generated by the learner algorithm:

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no".

This is a tiny change to the training set, but how would this change affect the decision tree that we generate?
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

| | |Outlook|
|---|---|---|
|Humidity|Sunny|Overcast|Rain|
|High|No|Yes|Yes|
|Normal|Yes|Yes|No|
|Wind| | |Weak|Strong|
|No|Yes|No|

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to overfitting.

The new test error is 2/14.

# Dealing with Overfitting with Pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent overfitting when learning a decision tree:

1. Pre-pruning: stop growing the tree early.
- Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
- Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 - v1.0 - Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

|Pre-Pruning|Post-Pruning|
|---|---|
|Minimum information gain: Decision not to split examples if expected information gain is less than threshold. Reduction in training error: Decision not to split examples if reduction in training error is below predefined threshold. Useful for splitting examples only when necessary.|Grow full tree first: Develop a complete tree and then trim it afterwards. Particularly useful when multiple features working together are informative. Recognizes cases where individual features are not informative but combined features are.|

# Example:

Data set with two binary input features, target feature is XOR function of the inputs.

Target feature is true only if input features have different values.

Individual input features alone provide no information about target feature.

Both input features together determine target feature.

# Pre-Pruning Example:

Testing each input feature individually gives zero information.

End up with a tree having only root node, predicting target feature randomly.

# Post-Pruning Example:

Grow full tree by testing both input features.

Prune nodes if necessary after full tree is grown.

Second input feature provides all necessary information.

Full tree predicts target feature perfectly.

Post-pruning useful for cases where multiple features together are beneficial.

Decision to post-prune a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 | v1.0 | Page 34 of 36
---
#

# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Post-Pruning Process:|1. We restrict our attention to nodes with only leaf nodes as descendants.
2. If the expected information gain at such a node is less than a predefined threshold, we delete its children (all leaf nodes) and convert the node to a leaf node.
3. At nodes with examples of different labels (positive and negative), a majority decision can be made.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#

# Practice Problems

# Practice Problems

1. 1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?
2. 2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?
3. Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

&copy; Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7 - Decision Trees

# Contents

|1 Learning Goals|3|
|---|---|
|2 Examples of Decision Trees|3|
|3 Definition and Classifying an Example|7|
|3.1 What is a decision tree?|7|
|3.2 Classifying an example using a decision tree|7|
|4 The Decision Tree Learning Algorithm|8|
|4.1 Issues in learning a decision tree|8|
|4.2 Grow a full tree given an order of testing features|8|
|4.3 When do we stop?|11|
|4.4 Base case 2: no features left|11|
|4.5 Base case 3: no examples left|13|
|4.6 Pseudo-code for the decision tree learner algorithm|15|
|5 Determine the Order of Testing Features|16|
|5.1 Which feature should we test at each step?|16|
|5.2 Identifying the most important feature|16|
|5.3 Entropy of a distribution over two outcomes|17|
|5.4 Expected information gain of testing a feature|19|
|5.5 A full example|20|
|6 Real-Valued Features|26|
|6.1 Jeeves dataset with real-valued temperatures|26|
|6.2 Handling a discrete feature|27|
|6.3 Handling a real-valued feature|28|
|6.4 Choosing a split point for a real-valued feature|28|
|7 Over-fitting|31|
---
#

# Lecture 7

# Lecture 7

|7.1|Corrupted data in the Jeeves dataset|31|
|---|---|---|
|7.2|Dealing with over-fitting with pruning|33|

# Practice Problems

Page 2 of 36

&copy; Alice Gao 2021 - v1.0
---
#

# Decision Trees Lecture

# CS 486/686 - Lecture 7

# 1. Learning Goals

- Describe the components of a decision tree.
- Construct a decision tree given an order of testing the features.
- Determine the prediction accuracy of a decision tree on a test set.
- Compute the entropy of a probability distribution.
- Compute the expected information gain for selecting a feature.
- Trace the execution of and implement the ID3 algorithm.

# 2. Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees.

Which Language Should You Learn in 2018?

- Useful or Cool?

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#

# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

1. Do you want a pet to love and care for?
YES / NO

2. Are you sure you have time to take care of a pet?
YES / NO

3. Do you want a pet that returns your affection?
YES / NO

4. Do you want to train your pet to do things?
YES / NO

5. Do you have a large open field?
YES / NO
---
#

# CS 486/686 Lecture 7

# Example: Should you use emoji in a conversation?

Age Group
Should I Use Emoji?

Under 20 Years Old
No

Over 20 Years Old, Are 40m
No

Over 65 Years Old
No

Is his work related?
No

Do you work in a tech/design field?
Yes

Are you into geekery?
No

Being quirky, will a cute emoji save you?
No

Are you trying to get fired?
No

Are you trying to set a serious tone?
Yes

Are you an alien being that needs help?
Great

Idiot
66 20 MinvieKIl

&copy; Alice Gao 2021 - v1.0 - Page 5 of 36
---
#

# Lecture 7

# Running Example

We will use the following example as a running example in this unit:

Training Set

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

3
Overcast
Hot
High
Weak
Yes

4
Rain
Mild
High
Weak
Yes

5
Rain
Cool
Normal
Weak
Yes

6
Rain
Cool
Normal
Strong
No

7
Overcast
Cool
Normal
Strong
Yes

8
Sunny
Mild
High
Weak
No

9
Sunny
Cool
Normal
Weak
Yes

10
Rain
Mild
Normal
Weak
Yes

11
Sunny
Mild
Normal
Strong
Yes

12
Overcast
Mild
High
Strong
Yes

13
Overcast
Hot
Normal
Weak
Yes

14
Rain
Mild
High
Strong
No

Test Set

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Mild
High
Strong
No

2
Rain
Hot
Normal
Strong
No

3
Rain
Cool
High
Strong
No

4
Overcast
Hot
High
Strong
Yes

5
Overcast
Cool
Normal
Weak
Yes

6
Rain
Hot
High
Weak
Yes

7
Overcast
Mild
Normal
Weak
Yes

8
Overcast
Cool
High
Weak
Yes

9
Rain
Cool
High
Weak
Yes

10
Rain
Mild
Normal
Strong
No

11
Overcast
Mild
High
Weak
Yes

12
Sunny
Mild
Normal
Weak
Yes

13
Sunny
Cool
High
Strong
No

14
Sunny
Cool
High
Weak
No
---
#

# Decision Trees

# CS 486/686 - Lecture 7

# 3. Deﬁnition and Classifying an Example

# 3.1 What is a decision tree?

A decision tree is a simple model for supervised classiﬁcation. It is used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature. The edges are labeled with the values of that input feature. Each leaf node specifies a value for the target feature.

# 3.2 Classifying an example using a decision tree

Classifying an example using a decision tree is very intuitive. We traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

# Example:

Here is an example of using the emoji decision tree. Assume:

- I am 30 years old.
- This is work related.
- I am an accountant.
- I am not trying to get fired.

Following the tree, we answer: no (not under 20 years old), no (not over 65 years old), yes (work related), no (not working in tech), and no (not trying to get fired). The leaf we reach is a thumb down, meaning we should not use emoji.

# Problem:

If we convert a decision tree to a program, what does it look like?

# Solution:

A decision tree corresponds to a program with a big nested if-then-else structure.

&copy; Alice Gao 2021 - v1.0 - Page 7 of 36
---
#

# Decision Tree Learning Algorithm

# CS 486/686 - Lecture 7

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

How can we build a decision tree given a data set?

1. What is the importance of deciding on an order of testing the input features?
2. How is a decision tree built by splitting the examples based on input features?

What are the considerations when deciding which decision tree to build?

1. How does the order of testing input features impact the decision tree?
2. What is the difference between making the optimal choice and the myopic best choice at each step?
3. Why might growing a smaller tree be preferred over a full tree?

# 4.2 Grow a full tree given an order of testing features

Provide an example of constructing a full tree using the Jeeves training set.
---
#

# Decision Tree Construction

# Decision Tree Construction

Problem: Construct a (full) decision tree for the Jeeves data set using the following order of testing features.

1. First, test Outlook.
2. For Outlook = Sunny, test Temp.
3. For Outlook = Rain, test Wind.
4. For other branches, test Humidity before testing Wind.

Solution: Here is the process to generate the decision tree by the given order.

We have 9 positive and 5 negative examples. They are not in the same class, so we will have to choose a feature to test.

Based on the given order, we will test Outlook first. Outlook has three values: Sunny, Overcast, and Rain. We split the examples into three branches.

Example
Outlook

1
Sunny

2
Overcast

3
Rain

The three sets look like this. Example 1 has Outlook equal to Sunny, so it goes into the left branch. Example 3 has Outlook equal to Overcast, so it goes into the middle branch, etc.

&copy; Alice Gao 2021 - v1.0 - Page 9 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Final Decision Tree:

Temp
Humidity
Wind

No
Yes
Yes
No

Yes
No
Yes
Yes

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm:

1. When all examples belong to the same class, the decision is made based on that class.
2. If there are no more features to test, we need to determine the next steps.

# Example Branch:

For a modified training set with 17 examples, let's construct a decision tree branch where Outlook is Sunny, Temperature is Mild, and Humidity is High.

&copy; Alice Gao 2021 - v1.0 - Page 11 of 36
---
#

# CS 486/686 Lecture 7

# CS 486/686 Lecture 7

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

17
Sunny
Mild
High
Strong
Yes

Solution: After testing Humidity is High, what should we do next? We have tested three of the four input features. To continue, testing Wind is the only option. When Wind is Strong, we have one positive example, and the decision is Yes. When Wind is Weak, we have three examples: one positive and two negative examples. The examples are mixed, so we cannot make a decision. But, we have tested all four features — there’s no more feature to test. What should we do in this case?

Let’s take another look at our data set. There are three examples when Wind is Weak. Note that, for the three examples, the values of all input features are all the same — Sunny, Mild, High, and Weak, but they have different labels, No for 8 and 15 and Yes for 16. This is an example of a noisy data set. With noisy data, even if we know the values of all the input features, we are still unable to make a deterministic decision. One reason for having a noisy data set is that the decision may be influenced by some features that we do not observe. Perhaps, another factor not related to weather influences Bertie’s decision, but we don’t know what that factor is.

What should we do when we run out of features to test? There are a few options. One option is to predict the majority class. In this case, the majority decision is No. Another option is to make a randomized decision. We can think of the three examples as a probability distribution. There is a 1/3 probability of predicting Yes and a 2/3 probability of predicting No. We will make the decision based on a random draw from the distribution. For this example, let’s use the majority decision.

&copy; Alice Gao 2021 | v1.0 | Page 12 of 36
---
#

# OCR Text

# Question 1:

What should be done if there are no examples left as per the stopping criteria?

# Question 2:

Complete one branch of the decision tree where Temperature is Hot, Wind is Weak, and Humidity is High:

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

3
Overcast
Hot
High
Weak
Yes
---
#

# Questions and Answers

# Questions and Answers

|Question|Answer|
|---|---|
|1. What decision is made if Outlook is Sunny, Overcast, or Rain?|If Outlook is Sunny, the decision is No. If Outlook is Overcast, the decision is Yes. If Outlook is Rain, there are no examples left.|
|2. Why did we encounter a case where no examples were left?|We encountered this case because the combination of input feature values (Temperature: Hot, Wind: Weak, Humidity: High, Outlook: Rain) did not exist in the dataset, leading to no examples left.|
|3. How should we handle a case where no examples are left?|One approach is to look at examples at the parent node that are closest to the case in question. These examples can be used to make a decision, which may involve a majority decision or a random draw from a probability distribution.|
---
#

# Decision Tree Learner Algorithm

# Pseudo-code for the decision tree learner algorithm

Algorithm 1 Decision Tree Learner (examples, features)

Line
Code

1
if all examples are in the same class then

2
return the class label.

3
else if no features left then

4
return the majority decision.

5
else if no examples left then

6
return the majority decision at the parent node.

7
else

8
choose a feature f .

9
for each value v of feature f do

10
build edge with label v.

11
build sub-tree using examples where the value of f is v.

Here is the pseudocode for the algorithm. Since a tree is recursive, we will naturally use a recursive algorithm to build it.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

# 5.1 Which feature should we test at each step?

In machine learning, overfitting can be a critical issue when building decision trees. To avoid overfitting, we aim to build a simple model with minimal features to test. The optimal order of testing features is computationally expensive to find, so a greedy and myopic approach is used. This approach involves choosing a feature at each step that makes the biggest difference to classification or helps in making a decision quickly.

# 5.2 Identifying the most important feature

To identify the most important feature, we look for the feature that reduces uncertainty the most. This reduction in uncertainty is measured by calculating the information content of the feature, which is the difference in uncertainty before and after testing the feature. Entropy, a concept from information theory, is used to measure uncertainty in a set of examples. Entropy is calculated by summing the product of the probability of each outcome and the log base 2 of that probability for all outcomes in the distribution.
---
#

# Entropy Calculation Questions

# Entropy Calculation Questions

# Problem 1:

What is the entropy of the distribution (0.5, 0.5)?

|(A) 0.2|(B) 0.4|
|---|---|
|(C) 0.6|(D) 0.8|
|(E) 1| |

# Solution:

The correct answer is (E).

Performing the calculation, we have:

-(0.5 log2(0.5)) × 2 = 1

The entropy is 1 bit.

You might be wondering, is one bit of entropy a lot or very little? You will get a better idea of this after question 2. For now, believe me when I say that there is a lot of uncertainty in this binary distribution.

This should make intuitive sense. This distribution is uniform. A uniform distribution has a lot of uncertainty since every outcome is equally likely to become true.

# Problem 2:

What is the entropy of the distribution (0.01, 0.99)?

|(A) 0.02|(B) 0.04|
|---|---|
|(C) 0.06|(D) 0.08|

We have a very skewed distribution. Almost all the probability is on the second outcome.
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 − p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 − p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass — one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let’s consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Here is the plot of the distribution’s entropy with respect to p: as p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Document

# Questions:

1. What are the maximum and minimum entropy for a distribution with three outcomes?
2. How can we quantify the information content of a feature?
3. What is the formula for calculating the expected information gain of testing a feature?
4. How do we calculate the entropy of k distributions when testing a feature with k values?

# Answers:

1. The maximum entropy for a distribution with three outcomes is log2(3) and the minimum entropy is 0.
2. The information content of a feature is calculated as the entropy of examples before testing the feature minus the entropy of examples after testing the feature, known as the expected information gain.
3. The formula for calculating the expected information gain of testing a feature is: Ibefore = I( p / (p + n), n / (p + n) ).
4. The entropy of k distributions when testing a feature with k values is calculated by determining the expected entropy across all possible distributions.
---
#

# Decision Tree Example

# Decision Tree Example

Here, we will work through generating a complete decision tree based on the rules introduced in this section. We can start with the following questions:

# Problem:

What is the entropy of the examples before we select a feature for the root node of the tree?

Options
Entropy Calculation

(A) 0.54
Not the correct answer

(B) 0.64
Not the correct answer

(C) 0.74
Not the correct answer

(D) 0.84
Not the correct answer

(E) 0.94
Correct answer

# Solution:

There are 14 examples: 9 positive, 5 negative. Applying the formula gives

Hbefore = -(9/14 * log2(9/14) + 5/14 * log2(5/14))

= -(14 * (-0.637) + 14 * (-1.485))

= -(-0.939)

≈ 0.94

&copy; Alice Gao 2021 | v1.0 | Page 20 of 36
---
#

# Questions

|# Problem 1:<br/>What is the expected information gain if we select Outlook as the root node of the tree? - (A) 0.237
- (B) 0.247
- (C) 0.257
- (D) 0.267
- (E) 0.277
Correct Answer: (B) 0.247|
|---|
|# Solution 1:<br/>Testing Outlook yields three branches:<br/>|Sunny|2+ 3− 5 total|
|Outlook = Rain|Overcast|4+ 0− 4 total|
| | |3+ 2− 5 total|

The expected information gain is:

Gain(Outlook) = 0.94 − (5(1/4 · I(2, 3) + 1/4 · I(4, 0) + 1/4 · I(3, 2)))

= 0.94 − 14(0.971) + 14(0) + 5

= 0.94 − 0.694

= 0.247

Correct Answer: (B)

# Problem 2:

What is the expected information gain if we select Humidity as the root node of the tree?

- (A) 0.151
- (B) 0.251
---
#

# Lecture 7

# Question:

Comparing Outlook and Humidity, which feature has the greater expected information gain?

# Options:

|Feature|Expected Information Gain|
|---|---|
|Outlook|0.247|
|Humidity|0.151|

# Answer:

The feature with the greater expected information gain is Outlook.
---
#

# Lecture 7

# CS 486/686 - Lecture 7

# Case 1: Outlook = Sunny

Attribute
Values
Information Gain
Positive Examples
Negative Examples

Temp
Cool
0.57
9, 11
8

Humidity
High, Normal
0.97
9, 11
1, 2, 8

Wind
Weak, Strong
0.019
9
1, 2, 8, 11

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

# Case 2: Outlook = Overcast

Attribute
Values
Positive Examples
Negative Examples

3, 7, 12, 13

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# CS 486/686 - Lecture 7

No need to test further, since the examples are already classified.

|Outlook = Rain|+|-|
|---|---|---|
|Hot| | |
|Temp = Cool|+|-|
|Temp = Mild|+|-|
| |Gain(Temp)|0.019|
|Humidity = High|+|-|
|Humidity = Normal|+|-|
|Gain(Humidity)|0.019| |
|Wind = Weak|+|-|
|Wind = Strong| | |
|Gain(Wind)|0.97| |

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 - v1.0 - Page 24 of 36
---
#

# Lecture 7 - Outlook

# Outlook

Sunny
Overcast
Rain

+
9, 11
3, 7, 12, 13
4, 5, 10

-
1, 2, 8

6, 14

# Humidity

High
Normal

+
9, 11
4, 5, 10

-
1, 2, 8
6, 14

# Wind

Weak
Strong

+
4, 5, 10

-

6, 14

# Decision

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

&copy; Alice Gao 2021 - v1.0 - Page 25 of 36
---
#

# Lecture 7 - Real-Valued Features

# CS 486/686 - Lecture 7

# 6. Real-Valued Features

# 6.1 Jeeves dataset with real-valued temperatures

So far, the decision tree learner algorithm only works when all of the features have discrete values. In the real world, we are going to encounter a lot of data sets where many features have continuous values, or they’re real-valued. Let’s see how decision trees can handle them.

# Example: A more realistic Jeeves dataset with real-valued temperatures

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
29.4
High
Weak
No

2
Sunny
26.6
High
Strong
No

3
Overcast
28.3
High
Weak
Yes

4
Rain
21.1
High
Weak
Yes

5
Rain
20.0
Normal
Weak
Yes

6
Rain
18.3
Normal
Strong
No

7
Overcast
17.7
Normal
Strong
Yes

8
Sunny
22.2
High
Weak
No

9
Sunny
20.6
Normal
Weak
Yes

10
Rain
23.9
Normal
Weak
Yes

11
Sunny
23.9
Normal
Strong
Yes

12
Overcast
22.2
High
Strong
Yes

13
Overcast
27.2
Normal
Weak
Yes

14
Rain
21.7
High
Strong
No

Instead of having the temperature being a discrete feature, having three values: Mild, Hot, and Cool, we will use actual numbers for Temperature.

For convenience, we will reorder the data set based on the value of the Temperature.

# Example: Jeeves dataset ordered by temperatures

&copy; Alice Gao 2021 - v1.0 - Page 26 of 36
---
#

# Decision Tree Data

# Decision Tree Data

Day
Outlook
Temp
Humidity
Wind
Tennis?

7
Overcast
17.7
Normal
Strong
Yes

6
Rain
18.3
Normal
Strong
No

5
Rain
20.0
Normal
Weak
Yes

9
Sunny
20.6
Normal
Weak
Yes

4
Rain
21.1
High
Weak
Yes

14
Rain
21.7
High
Strong
No

8
Sunny
22.2
High
Weak
No

12
Overcast
22.2
High
Strong
Yes

10
Rain
23.9
Normal
Weak
Yes

11
Sunny
23.9
Normal
Strong
Yes

2
Sunny
26.6
High
Strong
No

13
Overcast
27.2
Normal
Weak
Yes

3
Overcast
28.3
High
Weak
Yes

1
Sunny
29.4
High
Weak
No

# Handling a discrete feature

Before seeing how we can handle real-valued features, let’s review how we can handle a discrete feature. We considered two options:

- Allow multi-way splits:
- The tree becomes more complex than just if-then-else.
- The tree tends to be shallower.
- The expected information gain metric prefers a variable with a larger domain, because when a variable has a larger domain we can split the data points into more sets, and there’s a higher chance to reduce entropy.
- Restrict to binary splits:
- The tree is simpler and more compact.
- The tree tends to be deeper.

Example: As an extreme example, pretend that Day is an additional input feature in the Jeeves dataset, then the expected information gain for splitting on day must be the largest. Since we have one example for each day, and we can make a deterministic decision right away after splitting on day. However, it clearly does not make sense to use day as a feature, as the resulting tree does not generalize to any other data sets.
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a real-valued feature

When dealing with a real-valued feature, we have the following options:

- Discretize the feature by putting examples into buckets. This may lead to loss of valuable information and complexity in decision tree construction.
- Allow multi-way splits, which can be impractical due to unbounded feature domains.
- Restrict to binary splits and dynamically choose split points to avoid testing the same feature multiple times.

We will focus on binary splits for simplicity.

# Choosing a split point for a real-valued feature

A naive approach involves sorting instances by the feature, considering midpoints of consecutive values as split points, and selecting the one with the greatest expected information gain. However, this method may lead to considering too many points.

A smarter approach:

1. Sort instances based on the feature.
2. Identify split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between examples with feature values X and Y.

For example, with a modified dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Consider the following problems:

Problem
Question
Options

1
For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

2
For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

3
For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

Solutions:

1. For the midpoint between 20.0 and 20.6, the correct answer is (B) No.
2. For the midpoint between 21.1 and 21.7, the correct answer is (A) Yes.
3. For the midpoint between 21.7 and 22.2, the correct answer is (B) No.
---
#

# OCR Text

# Question:

Consider the following information:

Solution: This is a possible split point: L21.7 = {No} and L22.2 = {No, Yes}.

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

# Based on the above, what is the correct answer?

A) (A)

&copy; Alice Gao 2021 - v1.0 - Page 30 of 36
---
#

# Lecture 7: Over-fitting

# Lecture 7: Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several advantages in supervised machine learning, such as simplicity, ease of understanding, and interpretability.

When the need arises to explain a model to others, decision trees are preferred over neural networks due to their complexity and interpretability issues. Decision trees can also provide reasonable models even with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the benefits of decision trees, over-fitting remains a challenge during the construction process.

# Example: The Jeeves dataset

The Jeeves dataset consists of 14 data points, making it extremely small. However, a reasonable decision tree can still be learned from this dataset.

|Day|Outlook|Temp|Humidity|Wind|Tennis?|
|---|---|---|---|---|---|
|1|Sunny|Hot|High|Weak|No|
|2|Sunny|Hot|High|Strong|No|
|3|Overcast|Hot|High|Weak|Yes|
|4|Rain|Mild|High|Weak|Yes|
|5|Rain|Cool|Normal|Weak|Yes|
|6|Rain|Cool|Normal|Strong|No|
|7|Overcast|Cool|Normal|Strong|Yes|
|8|Sunny|Mild|High|Weak|No|
|9|Sunny|Cool|Normal|Weak|Yes|
|10|Rain|Mild|Normal|Weak|Yes|
|11|Sunny|Mild|Normal|Strong|Yes|
|12|Overcast|Mild|High|Strong|Yes|
|13|Overcast|Hot|Normal|Weak|Yes|
|14|Rain|Mild|High|Strong|No|

Decision tree generated by the learner algorithm:

© Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Decision Tree Analysis

# Decision Tree Analysis

# Training Set Data:

Day
Outlook
Temp
Humidity
Wind
Tennis?

1
Sunny
Hot
High
Weak
No

2
Sunny
Hot
High
Strong
No

3
Overcast
Hot
High
Weak
No

4
Rain
Mild
High
Weak
Yes

5
Rain
Cool
Normal
Weak
Yes

6
Rain
Cool
Normal
Strong
No

7
Overcast
Cool
Normal
Strong
Yes

8
Sunny
Mild
High
Weak
No

9
Sunny
Cool
Normal
Weak
Yes

10
Rain
Mild
Normal
Weak
Yes

11
Sunny
Mild
Normal
Strong
Yes

12
Overcast
Mild
High
Strong
Yes

13
Overcast
Hot
Normal
Weak
Yes

14
Rain
Mild
High
Strong
No

# Effect of Data Corruption:

If the label for the third data point changes from "yes" to "no", it would affect the decision tree generated by the learner algorithm. The change in this single data point could lead to a different classification outcome in the decision tree, impacting the accuracy of the model.
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

Sunny
Overcast
Rain

Humidity
High
Normal
High

Wind
No
Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, leading to a more complicated tree that may not generalize well.

# Dealing with Over-fitting with Pruning

To prevent over-fitting, it's better to grow a smaller and shallower tree that may generalize better to test data.

# Pre-Pruning Criteria:

1. Maximum Depth: Stop growing the tree if the node's depth reaches a predefined maximum value.
2. Minimum Examples: Stop splitting if the number of examples at a node is below a threshold.

The new test error after addressing over-fitting is 2 out of 14.

&copy; Alice Gao 2021 - v1.0 - Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Key points discussed in Lecture 7:

1. Minimum Information Gain:
We can decide not to split the examples if the benefit of splitting at that node is not large enough. The benefit can be measured by calculating the expected information gain. Do not split examples if the expected information gain is less than the threshold.
2. Reduction in Training Error:
We can decide not to split the examples at a node if the reduction in training error is less than a predefined threshold value.

Pre-pruning: Split examples at a node only when it's useful. Pre-pruning can be used with any of the criteria mentioned above.

Post-pruning: Grow a full tree first and then trim it afterwards. Post-pruning is particularly useful when multiple features working together are very informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

Each input feature alone provides no information about the target feature, but both input features together determine the target feature.

# Pre-pruning:

If we test none of the two input features, the tree will have only the root node and predict the target feature randomly.

# Post-pruning:

After growing the full tree and testing both input features, we realize that pruning any node is not beneficial as the second input feature provides all the necessary information. The full tree predicts the target feature perfectly.

Post-pruning helps in cases where multiple features working together are beneficial, even if individual features are not informative.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Example: Suppose we are considering post-pruning with the minimal information gain metric.

First of all, we will restrict our attention to nodes that only have leaf nodes as its descendants. At a node like this, if the expected information gain is less than a predefined threshold value, we will delete this node’s children which are all leaf nodes and then convert this node to a leaf node.

There has to be examples with different labels at this node possibly both positive and negative examples. We can make a majority decision at this node.

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#

# Practice Problems - Decision Trees

# Practice Problems

1. 1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?
2. 2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?
3. Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

&copy; Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Simple Linear Regression

# Simple Linear Regression

Material from Devore’s book (Ed 8), and Cengagebrain.com
---
#
# Simple Linear Regression

# Simple Linear Regression

|Rating|
|---|
|20|40|60|80|

| |0|5|10|15|
|---|---|---|---|---|
|Sugar| | | |2|
---
#

# Simple Linear Regression

# Simple Linear Regression

|Rating|20|40|60|80|
|---|---|---|---|---|
| |0|5|10|15|
| |Sugar|Sugar|Sugar|Sugar|
| |3|3|3|3|
---
#
# Simple Linear Regression

# Simple Linear Regression

|Rating|
|---|
|20|40|60|80|

| | | | | | | | | | | | | | | | |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | |
| | | | | | | | | | | | | | | | |
|Sugar| | | |4| | | | | | | | | | | |
---
#

# Simple Linear Regression Model

# The Simple Linear Regression Model

The simplest deterministic mathematical relationship between two variables x and y is a linear relationship: y = β0 + β1x. The objective of this section is to develop an equivalent linear probabilistic model.

If the two (random) variables are probabilistically related, then for a fixed value of x, there is uncertainty in the value of the second variable. So we assume Y = β0 + β1x + ε, where ε is a random variable.

2 variables are related linearly “on average” if for fixed x the actual value of Y differs from its expected value by a random amount (i.e. there is random error).
---
#
# Linear Probabilistic Model

# A Linear Probabilistic Model

Definition: The Simple Linear Regression Model

There are parameters β0, β1, and σ2, such that for any fixed value of the independent variable x, the dependent variable is a random variable related to x through the model equation:

Y = β0 + β1x + ε1

The quantity ε in the model equation is the "error" random variable, assumed to be symmetrically distributed with E(ε) = 0 and V(ε) = σε2 = σ2

(no assumption made about the distribution of ε, yet)
---
#

# Linear Probabilistic Model

# Linear Probabilistic Model

X: the independent, predictor, or explanatory variable (usually known). NOT RANDOM.

Y: The dependent or response variable. For fixed x, Y will be a random variable.

ε: The random deviation or random error term. For fixed x, ε will be a random variable.

# Question:

What exactly does ε do?

# Answer:

The random deviation or random error term ε in a linear probabilistic model represents the variability or uncertainty in the relationship between the independent variable X and the dependent variable Y. It captures the difference between the observed value of Y and the value predicted by the model based on X. In other words, ε accounts for the factors that are not explained by the independent variable X in the model.
---
#

# Linear Probabilistic Model

# A Linear Probabilistic Model

The points (x1, y1), …, (xn, yn) resulting from n independent observations will then be scattered about the true regression line:

|(x1, y1)|(x2, y2)|True regression line: y = Bo + Bjx|
|---|---|---|
|X1|Y1| |
|X2|Y2| |

Image cannot be displayed.
---
#
# Linear Probabilistic Model

# A Linear Probabilistic Model

How do we know simple linear regression is appropriate?

# Theoretical considerations

# Scatterplots

0.4
0.6
0.8
1.0
1.2
1.4
1.6
palwidth
9
---
#
# Linear Probabilistic Model

# A Linear Probabilistic Model

If we think of an entire population of (x, y) pairs, then:

- μY x∗ is the mean of all y values for which x = x∗
- σ2Y x∗ is a measure of how much these values of y spread out about the mean value

For example, if x = age of a child and y = vocabulary size:

- μY 5 is the average vocabulary size for all 5 year old children in the population
- σ2Y 5 describes the amount of variability in vocabulary size for this part of the population
---
#
# Linear Probabilistic Model

# A Linear Probabilistic Model

|Parameter|Interpretation|
|---|---|
|β0|The intercept of the true regression line: The average value of Y when x is zero.|
|β1|The slope of the true regression line: The expected (average) change in Y associated with a 1 unit increase in the value of x.|
---
#

# Linear Probabilistic Model

# Questions:

1. What is σ^2Y | x∗?
2. How do we interpret σ^2Y | x?

# Homoscedasticity:

We assume the variance (amount of variability) of the distribution of Y values to be the same at each different value of fixed x (i.e. homogeneity of variance assumption).

12
---
#

# Normal Distribution in Regression Analysis

# Question:

When errors are normally distributed, what does the variance parameter σ2 determine?

(a) Normal distribution, mean 0, standard deviation 0

(b) Distribution of Y for different values of x

(c) Distribution of errors for different values of x

(d) The extent to which each normal curve spreads out about the regression line

# Answer:

The variance parameter σ2 determines the extent to which each normal curve spreads out about the regression line.
---
#

# Linear Probabilistic Model

# A Linear Probabilistic Model

When σ2 is small, an observed point (x, y) will almost always fall quite close to the true regression line, whereas observations may deviate considerably from their expected values (corresponding to points far from the line) when σ2 is large.

Thus, this variance can be used to tell us how good the linear fit is.

But how do we define “good”?

14
---
#

table {
width: 100%;
border-collapse: collapse;
}

table, th, td {
border: 1px solid black;
}

th, td {
padding: 10px;
text-align: left;
}

# Estimating Model Parameters

The values of &beta;, &beta;, and &sigma;2 will almost never be known to an investigator.
Instead, sample data consists of n observed pairs (x, y), ..., (x, y), from which pe model parameters and pe true regression line itself can be estimated.
The data (pairs) are assumed to have been obtained independently of one anoper.
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Estimating Model Parameters

|Equation|Yi = β0 + βxi + εi|
|---|---|
|Conditions|i = 1, 2, … , n|
|Deviations|ε1, ε2, …, εn are independent random variables|
|Note|(Y1, Y2, …, Yn are independent too, why?)|
---
#
# Estimating Model Parameters

# Estimating Model Parameters

The “best fit” line is motivated by the principle of least squares, which can be traced back to the German mathematician Gauss (1777–1855):

A line provides the best fit to the data if the sum of the squared vertical distances (deviations) from the observed points to that line is as small as it can be.

| |10|20|30|40|
|---|---|---|---|---|
|Applied stress (kg/mm²)|380|160|240|220|

J = b₀ + b₁x
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Estimating Model Parameters

|The sum of squared vertical deviations from the points (x1, y),…, (xn, y) to the line is then|n|
|---|---|
|f(bo, b) = Σ(yi - (bo + bxi))^2| |
|The point estimates of &beta;0 and &beta;, denoted by Bo and B1, are called the least squares estimates – they are those values that minimize f(b0, b1).| |
|f(B0, B1) = f(b0, b1)| |
---
#

table {
width: 100%;
border-collapse: collapse;
}
th, td {
border: 1px solid black;
padding: 8px;
text-align: left;
}

# Estimating Model Parameters

The fitted regression line or least squares line is pen pe line whose equation is y = b0 + b1x.
The minimizing values of b0 and b1 are found by taking partial derivatives of f(b0, b1) wip respect to bop b0 and b1, equating pem bop to zero [analogously to f'(b) = 0 in univariate calculus], and solving pe equations:
df/db0 = Σ2(yi - b0 - b1xi) = 0
df/db1 = Σ2(yi - b0 - b1xi) * (-xi) = 0
---
#

table {
width: 100%;
border-collapse: collapse;
}
th, td {
border: 1px solid black;
padding: 8px;
text-align: left;
}

# Estimating Model Parameters

|Formula for Least Squares Estimate of Slope Coefficient β1|b1 = Σ(xi * yi) - (Σxi * Σyi) / n / Σ(xi^2) - (Σxi)^2 / n|
|---|---|
|Given Values|X = 81, Dyi = 4, Σxi = 32, Sxr = 20|

|Shortcut Formulas for Numerator and Denominator of β1|Sxy = Σ(xi * yi) - (Σxi * Σyi) / n / Σ(xi^2) - (Σxi)^2 / n|
|---|---|
|Calculation Steps|Typically columns for x, y, xyi, and xi^2 are constructed and then Sxy and Sxx are calculated.|
---
#
# Estimating Model Parameters

# Estimating Model Parameters

The least squares estimate of the intercept β0 of the true regression line is:

bo = B0 = Σyi / n

The computational formulas for Sxy and Sxx require only the summary statistics Σx, Σy, Σxi2, and Σxyi.

(Σyi2 will be needed shortly for the variance.)
---
#

# Regression Line Example

# Regression Line Example

The cetane number is a critical property in specifying the ignition quality of a fuel used in a diesel engine.

Determination of this number for a biodiesel fuel is expensive and time consuming.

The article “Relating the Cetane Number of Biodiesel Fuels to Their Fatty Acid Composition: A Critical Study” (J. of Automobile Engr., 2009: 565–583) included the following data on x = iodine value (g) and y = cetane number for a sample of 14 biofuels.

|Biofuel Sample|Iodine Value (x)|Cetane Number (y)|
|---|---|---|
|1|...|...|
|2|...|...|
|3|...|...|
|4|...|...|
|5|...|...|
|6|...|...|
|7|...|...|
|8|...|...|
|9|...|...|
|10|...|...|
|11|...|...|
|12|...|...|
|13|...|...|
|14|...|...|
---
#

# Regression Analysis

# Regression Analysis

|X (Iodine Value)|113.0|129.0|120.0|113.2|105.0|92.0|84.0|83.2|88.4|59.0|80.0|81.5|71.0|69.2|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|Y (Oil Saturation)|46.0|48.0|51.0|52.1|54.0|52.0|59.0|58.7|61.6|64.0|61.4|58.8|58.0| |

Calculating the relevant statistics:

- Σxi = 1307.5
- Σyi = 779.2
- Σxi² = 128,913.93
- Σxiyi = 71,347.30

From the above values:

- Sxx = 128,913.93 - (1307.5)²/14 = 6802.7693
- Sxy = 71,347.30 - (1307.5)(779.2)/14 = -1424.41429
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Question:

What is shown in the scatter plot with the least squares line superimposed?

# Answer:

The scatter plot shows the fitted regression line.

|cel nUM|75.21|0.2094|iod val|
|---|---|---|---|
|65|60|155|50|
|45|50|60|70|
|80|90|100|110|
|120|130|140| |
---
#

# Fitted Values and Residuals

# Fitted Values and Residuals

Fitted Values:

The fitted (or predicted) values Y1, Y2, ..., Yn are obtained by substituting x1, x2, ..., xn into the equation of the estimated regression line:

|Y1|Y2|Yn|
|---|---|---|
|Y1 = Bo + BiX1|Y2 = Bo + BiX2|Yn = Bo + Bjxn|

Residuals:

The differences Y1 - Y1, Y2 - Y2, ..., Yn - Yn between the observed and fitted y values.

Residuals are estimates of the true error - WHY?

25
---
#
# Sum of the residuals

When the estimated regression line is obtained via the principle of least squares, the sum of the residuals should in theory be zero, if the error distribution is symmetric, since:

X(yi − ( βˆ0 + βˆ1x)) = ny − n βˆ0 − βˆ1nx = n βˆ0 − n βˆ0 = 0
380
160
240
20

y = bo + bgx

Applied stress (kg/mm?)

26
---
#

# Example(fitted values)

# Example(fitted values)

filtration rate (x)
125.3
98.2
201.4
147.3
145.9
124.7
112.2
120.2
161.2
178.9

moisture content (y)
77.9
76.8
81.5
79.8
78.2
78.3
77.5
77.0
80.1
80.2

V
79.9
79.0
76.7
78.2
79.5
78.1
81.5
77.0
79.0
78.6

Summary quantities (summary statistics):

- Σxi = 2817.9
- Σyi = 1574.8
- Σx2i = 415,949.85
- Σxi yi = 222,657.88
- Σy2i = 124,039.58

From Sxx = 18,921.8295 and Sxy = 776.434.

Calculation of residuals: 27
---
#

# Fitted Values Table

# Fitted Values Table

Obs
Filtrate
Moistcon
Fit
Residual

1
125.3
77.9
78.100
0.200

2
98.2
76.8
76.988
0.188

3
201.4
81.0
81.223
0.277

4
147.3
79.8
79.003
0.797

5
145.9
78.2
78.945
0.745

6
124.7
78.3
78.075
0.225

7
112.2
77.5
77.563
0.063

8
120.2
77.0
77.891
~0.891

9
161.2
80.1
79.573
0.527

10
178.9
80.2
80.299
0.099

12
159.5
145.8
79.9
79.503

79.0

78.941

0.397

0.059

13
75.1
76.7
76.040
0.660

14
151.4
78.2
79.171
~0.971

15
144.2
79.5
78.876
0.624

16
125.0
78.1
78.088
0.012

17
198.8
81.5
81.116
0.384

18
132.5
77.0
78.396
1.396

19
159.6
79.0
79.508
0.508

20
110.7
78.6
77.501
1.099

28
---
#

# Fitted Values

# Fitted Values

We interpret the fitted value as the value of y that we would predict or expect when using the estimated regression line with x = xi; thus Yi is the estimated true mean for that population when x = xi (based on the data).

The residual Yi - Yi is a positive number if the point lies above the line and a negative number if it lies below the line.

The residual can be thought of as a measure of deviation and we can summarize the notation in the following way:

|Notation|Formula|
|---|---|
|✏i|⇡ βˆ0 + ˆ1xi + ˆi = Y β✏ ˆi + ˆi ✏ ) Yi − ˆi = ˆi Y ✏|

29
---
|Question:|What parameter determines the amount of spread about the true regression line?|
|---|---|
|Answer:|σ2|
|Question:|Provide two separate examples mentioned in the text.|
|Answer:|1. V = Product sales, J = Elongation|
| |2. T = Tensile force, T = Advertising expenditure|
---
#

# Estimating σ2 and σ

# Estimating σ2 and σ

An estimate of σ2 will be used in confidence interval (CI) formulas and hypothesis testing procedures presented in the next two sections.

Many large deviations (residuals) suggest a large value of σ2, whereas deviations all of which are small in magnitude suggest that σ2 is small.

31
---
#
# Estimating σ^2 and σ

# Estimating σ^2 and σ

The error sum of squares (equivalently, residual sum of squares), denoted by SSE, is:

SSE = Σ(yi - ŷi)^2 = Σ(yi - ŷi)(Bo + B1xi)

And the estimate of σ^2 is:

|σ^2 = s^2 =|SSE|Σ(yi - ŷi)^2|= n - 2|
|---|---|---|---|
|σ|n - 2| | |

(Note that the homoscedasticity assumption comes into play here.)
---
#
# Estimating σ2 and σ

# Estimating σ2 and σ

The divisor n – 2 in s2 is the number of degrees of freedom (df) associated with SSE and the estimate s2.

This is because to obtain s2, the two parameters β0 and β1 must first be estimated, which results in a loss of 2 df (just as μ had to be estimated in one sample problems, resulting in an estimated variance based on n – 1 df in our previous t tests).

Replacing each yi in the formula for s2 by the r.v. Yi gives the estimator S2.

It can be shown that the r.v. S2 is an unbiased estimator for σ2.

33
---
#

# Variance Estimator Example

# Variance Estimator Example

|Calculation|Value|
|---|---|
|Error Sum of Squares (SSE)|7.968|
|Estimate of σ^2 (s^2)|0.4427|
|Estimated Standard Deviation (s)|0.665|

Roughly speaking, 0.665 is the magnitude of a typical deviation from the estimated regression line—some points are closer to the line than this and others are further away.

Reference: 34
---
#
# Estimating σ^2 and σ

# Estimating σ^2 and σ

Computation of SSE from the defining formula involves much tedious arithmetic, because both the predicted values and residuals must first be calculated.

Use of the following shortcut formula does not require these quantities:

SSE = Σ(yi - ŷi)2
BoZy;5B,Ex;i
This expression results from substituting Yi = Bo + B1-xi Z(yi - %;}, into squaring the summand, carrying through the sum to the resulting three terms, and simplifying.
---
#

# Coeficient of Determination

# The Coefficient of Determination

Different variability in observed y values:

Using pe linear model to explain y variation:
(a) data for which all variation is explained;
(b) data for which most variation is explained;
(c) data for which little variation is explained

36
---
#
# Questions about Coefficient of Determination

# Questions about Coefficient of Determination

Answer the following questions based on the information provided:

# Question 1:

What does it mean when all points in a scatter plot fall exactly on a straight line?

a) 100% of the sample variation in y can be attributed to the linear relationship between x and y

b) There is no relationship between x and y

c) The data is invalid

# Question 2:

What can be concluded when the points in a scatter plot do not fall exactly on a line but the deviations from the least squares line are small?

a) There is no relationship between x and y

b) Much of the observed y variation can be attributed to the approximate linear relationship between the variables

c) The data is unreliable

# Question 3:

What does it indicate when there is substantial variation about the least squares line in a scatter plot?

a) The linear relationship between x and y is strong

b) The simple linear regression model fails to explain variation in y by relating y to x

c) The data is inconclusive
---
#

# Questions and Answers

# The Coefficient of Determination

The error sum of squares (SSE) can be interpreted as a measure of how much variation in y is left unexplained by the model—that is, how much cannot be attributed to a linear relationship.

In the first plot SSE = 0, and there is no unexplained variation, whereas unexplained variation is small for the second plot, and large for the third plot.

A quantitative measure of the total amount of variation in observed y values is given by the total sum of squares (SST).

|SST|SSE|Σ(yi - ȳ)²|Σ(yi - ȳ)² (ŷi)lin|
|---|---|---|---|
| | | |38|
---
#

# Questions on Coefficient of Determination

# Questions on Coefficient of Determination

|Question|Answer|
|---|---|
|What is the Total Sum of Squares (SST) in the context of the Coefficient of Determination?|The SST is the sum of squared deviations about the sample mean of the observed y values when no predictors are taken into account.|
|How does SST differ from SSE?|In SST, the same number y is subtracted from each yi, while in SSE, each different predicted value Yi is subtracted from the corresponding observed y.|
|Why is SST considered as bad as SSE can get in the absence of a regression model?|If there is no regression model (i.e., slope is 0), then SST is as bad as SSE can get.|
|What motivates the definition of SST in the context of the Coefficient of Determination?|The definition of SST is motivated by the scenario where there is no regression model, and the slope is 0.|
---
#

# Coeficient of Determination

# The Coefficient of Determination

Just as SSE is the sum of squared deviations about the least squares line y = Bo + B1x; SST is the sum of squared deviations about the horizontal line at height y as pictured below:

Horizontal line at height y
Least squares line y = Bo + B1x
Sums of squares illustrated:

1. (a) SSE = sum of squared deviations about the least squares line;
2. (b) SSE = sum of squared deviations about the horizontal line

40
---
#

# The Coefficient of Determination

# The Coefficient of Determination

The coefficient of determination, denoted as r2, is a measure that indicates the proportion of the variance in the dependent variable that is predictable from the independent variable(s) in a regression model.

|Concept|Description|
|---|---|
|Sum of Squared Deviations (SSE)|The sum of squared deviations about the least squares line is smaller than the sum of squared deviations about any other line, i.e. SSE &lt; SST unless the horizontal line itself is the least squares line.|
|SSE/SST Ratio|The ratio SSE/SST is the proportion of total variation that cannot be explained by the simple linear regression model.|
|r2|r2 = 1 - SSE/SST (a number between 0 and 1) is the proportion of observed y variation explained by the model. If SSE = 0, then r2 = 1.|

Note: The coefficient of determination ranges between 0 and 1, where 1 indicates a perfect fit of the model to the data.

Reference: 41
---
#
# Coefficient of Determination

# The Coefficient of Determination

Definition:

The coefficient of determination, denoted by r2, is given by:

|r2 = 1 -|SSE|= 1 -|SSE|
|---|---|---|---|
| |SST| |Syy|

It is interpreted as the proportion of observed y variation that can be explained by the simple linear regression model (attributed to an approximate linear relationship between y and x).

The higher the value of r2, the more successful is the simple linear regression model in explaining y variation.
---
#
# Example Scatter Plot

# Scatter Plot for Example

The scatter plot of the iodine value–cetane number data in the previous example implies a reasonably high r2 value.

cel nUM = 75.2, 10.2, 94 iod val

|iodine value|50|60|70|80|90|100|110|120|130|140|
|---|---|---|---|---|---|---|---|---|---|---|
|cetane number|155| |50| |45| | | | | |
---
#
# Example

The coefficient of determination for the previous example is then:

r2
= 1 - SSE/SST
= 1 - (78.920)/(377.174)
= 0.791
That is, 79.1% of the observed variation in cetane number is attributable to (can be explained by) the simple linear regression relationship between cetane number and iodine value.
---
#
# Questions and Answers

# The Coefficient of Determination

The coefficient of determination can be written in a slightly different way by introducing a third sum of squares—regression sum of squares, SSR—given by:

SSR = Σ(Yi - ŷ)² = SST - SSE

Regression sum of squares is interpreted as the amount of total variation that is explained by the model.

Then we have:

r² = 1 - SSE/SST = (SST - SSE)/SST = SSR/SST

The ratio of explained variation to total variation.
---
#

# Inferences About the Slope Parameter β1

# Inferences About the Slope Parameter β1

In virtually all of our inferential work thus far, the notion of sampling variability has been pervasive.

Properties of sampling distributions of various statistics have been the basis for developing confidence interval formulas and hypothesis testing methods.

Same idea as before: The value of any quantity calculated from sample data (which is random) will vary from one sample to another.

46
---
#
# Inferences About the Slope Parameter β1

# Inferences About the Slope Parameter β1

The estimators are:

B1
E(x;~Z(x; - x)2TY_Y => B; = Z(xiSxxT)Y=Zc;Y
That is, B1 is a linear function of the independent random variables Y1, Y2, ..., Yn, each of which is normally distributed.

Similarly, we have the estimators:

Bo
ZYi
BZtz/n
And, 02 = S2 = Ey2 = BoZY~BEwYin - 2
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Inferences About the Slope Parameter β1

Invoking properties of a linear function of random variables as discussed earlier, leads to the following results:

Results
1. The mean value of β1 is E(β1) = β, so β1 is an unbiased estimator of β1 (pe distribution of β1 is always centered at pe value of β, which is unknown).
2. The variance and standard deviation of β1 are Var(β1) = σ^2 * Σ(xi - x)^2 / Σ(xi - x)^2, where σ is pe (unknown) true standard deviation.

48
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Inferences About the Slope Parameter β1

Replacing σ by its estimate s gives an estimate for β1
(pe estimated standard deviation, i.e., estimated standard error, of): S
SB1 = NSxx
This estimate can also be denoted by 0B1.
(Recall s^2 = SSE/n^2)

3. The estimator has a normal distribution (because it is a linear function of independent normal r.v.’s).

49
---
#
# Inferences About the Slope Parameter β1

# Inferences About the Slope Parameter β1

NOTE:

- xi values that are quite spread out = estimator with a low standard error.
- xi all close to one another = highly variable estimator.

If the x’s are spread out too far, a linear model may not be appropriate throughout the range of observation.

50
---
#

# Inferences About the Slope Parameter β1

# Inferences About the Slope Parameter β1

Theorem:

The assumptions of the simple linear regression model imply that the standardized variable

|T|=|81|B1|
|---|---|---|---|
|S/√Sxx| | |=|4|

has a t distribution with n – 2 df (since σ ≈ s).

51
---
#
# Confidence Interval for β1

# A Confidence Interval for β1

As in the derivation of previous CIs, we begin with a probability statement:

P ~tal n-2 81_ B ta/ n-2 =1 _ Q Sp;

Manipulation of the inequalities inside the parentheses to isolate β1 and substitution of estimates in place of the estimators gives the CI formula.

A 100(1 – α)% CI for the slope β1 of the true regression line is B1 + ta/2 n-2 Sp; 52
---
#

# Clay Brick Masonry Weight Variation

# Variations in Clay Brick Masonry Weight

Variations in clay brick masonry weight have implications not only for structural and acoustical design but also for design of heating, ventilating, and air conditioning systems.

# Data from the Article "Clay Brick Masonry Weight Variation"

X
5.7
6.8
9.6
10.0
10.7
12.6
14.4
15.0
15.3
16.2
17.8
18.7
19.7
20.6
25.0

y
119.0
121.3
118.2
124.0
112.3
114.1
112.2
115.1
1113
107.2
108.9
107.8
111.0
106.2
105.0
---
#
# Example

The scatter plot of this data in Figure 12.14 certainly suggests the appropriateness of the simple linear regression model; there appears to be a substantial negative linear relationship between air content and density, one in which density tends to decrease as air content increases.

|Density|125|
|---|---|
| |115|
| |105|

Air content
25
54

Scatter plot of the data from Example 11 Figure 12.14
---
#

# Statistics Questions

# Statistics Questions

|Question|Answer|
|---|---|
|1. What is r2 and how is it interpreted?|r2 is the coefficient of determination, which represents the proportion of the variance in the dependent variable that is predictable from the independent variable(s). It ranges from 0 to 1, where 0 indicates no linear relationship and 1 indicates a perfect linear relationship.|
|2. What is the 95% confidence interval for the slope?|The 95% confidence interval for the slope can be calculated using the formula: slope ± t*(standard error of the slope), where t is the critical value from the t-distribution with n-2 degrees of freedom at 0.025 significance level. This interval provides a range within which we are 95% confident that the true slope of the regression line lies.|
---
#

table {
width: 100%;
border-collapse: collapse;
}
th, td {
border: 1px solid black;
padding: 8px;
text-align: left;
}

# Hypothesis Testing Procedures

|Hypotheses|The most commonly encountered pair of hypotheses about β1 is H: β1 = 0 versus H: β1 ≠ 0. When this null hypothesis is true, μY - x = β0 (independent of x). Then knowledge of x gives no information about the value of the dependent variable.|
|---|---|
|Null Hypothesis|H: β1 = 0|
|Test Statistic Value|t = B1Sp1B1e (“t ratio”) 56|
---
#
# Hypothesis Testing Procedures

# Hypothesis Testing Procedures

Alternative Hypothesis
Testing Procedure

Ha: β1 > β10
t ≥ tα,n – 2

Ha: β1 < β10
t ≤ –tα,n – 2

Ha: β1 ≠ β10
either t ≥ tα/2,n – 2 or t ≤ –tα/2,n – 2

A P value based on n – 2 can be calculated just as was done previously for t tests.

If H0: β1 = 0, then the test statistic is the t ratio t = B/Ise.

57
---
#

# Regression in R

# Regression in R

Question: What is the topic of the text?

Answer: Regression in R

Question: What is the number displayed in the text?

Answer: 58
---
#
# Inference Concerning Mean of Future Y

Let x* denote a specified value of the independent variable x.

Bo + B1*x* can be regarded either as a point estimate of UY:x* (the expected or true average value of Y when x = x*) or as a prediction of the Y value that will result from a single observation made when x = x*.

Once the estimates Bo and B1 have been calculated.

59
---
#

# Inference Concerning Mean of Future Y

# Inference Concerning Mean of Future Y

The estimate of β0 is random, so we can develop a Confidence Interval (CI) for β0 and a prediction interval (PI) for a single Y value. What is the difference?

Before we obtain sample data, both β0 and β1 are subject to sampling variability—they are both statistics whose values will vary from sample to sample.

Suppose, for example, that the true β0 = 439 and β1 = 0.05. Then a first sample of (x, y) pairs might give β0 = 439.35, β1 = 0.048; a second sample might result in β0 = 438.52, β1 = 0.051; and so on.
---
#

# Inference Concerning Mean of Future Y

# Inference Concerning Mean of Future Y

It follows that Y = β0 + β1x* itself varies in value from sample to sample – it is a random variable.

If the intercept and slope of the population line are the values 439 and 0.05, respectively, and suppose x* = 5kgs, then this statistic is trying to estimate the true value which is:

|Calculation|Result|
|---|---|
|439 + 0.05(5)|439.25|

Then the estimate from a first sample might be:

|Calculation|Result|
|---|---|
|439.35 + 0.048(5)|439.59|

From a second sample it might be:

|Calculation|Result|
|---|---|
|438.52 + 0.051(5)|438.775|
---
#

table {
width: 100%;
border-collapse: collapse;
}
th, td {
border: 1px solid black;
padding: 8px;
text-align: left;
}

# Inference Concerning Mean of Future Y

Inferences about pe mean Y value
x* will be based on properties of pe sampling distribution of pe statistic Yˆ = βˆ0 + βˆ1x
Substitution of pe expressions for and into + x* followed by some algebraic manipulation leads to pe representation of + x* as a linear function of pe Y’s:
Bo + Bz* 2/"n (x*Z(xi - 1?W(xi5 3x = Zd,
The coefficients d, d, …., dn in pis linear function involve pe x’s and x∗, all of which are fixed.
---
#

# Inference Concerning Mean of Future Y

# Inference Concerning Mean of Future Y

Application of the rules to this linear function gives the following properties.

Proposition
Let Ŷ = β̂0 + β̂1x∗ where x∗ is some fixed value of x. Then β̂1
1. The expectation of E(Y) = E(β0 + β1x∗) = Lβ0 + B;x∗ = β0 + βx∗
Thus Ŷ = β̂0 + β̂1x∗ is an unbiased estimator for β0 + βx∗ β1

(i.e., for).

63
---
#
# Inference Concerning Mean of Future Y

# Questions:

1. What is the formula for the variance of Y?
2. How is the standard deviation calculated from the variance formula?
3. What is the estimated standard deviation Sy denoted by?
4. What is the formula for Sy when replacing σ by its estimate s?
5. What type of distribution does Y have?

# Answers:

1. The formula for the variance of Y is v(Y) = σ²/n + Σ(xᵢ - x̄)²/n.
2. The standard deviation is the square root of the variance formula.
3. The estimated standard deviation Sy is denoted by Spo+Ba.
4. The formula for Sy when replacing σ by its estimate s is Sy = Spo+Ba * √(1 + (xᵢ - x̄)²/n).
5. Y has a normal distribution.
---
#
# Inference Concerning Mean of Future Y

Inference Concerning Mean of Future Y

The variance of x* is smallest when x* = x and increases as x* moves away from x in either direction.

Thus the estimator of μY - x* is more precise when x* is near the center of the x’s than when it is far from the values at which observations have been made. This will imply that both the CI and PI are narrower for an x* near x than for an x* far from x.

65
---
#
# Questions on Distribution of Future Y

# Questions on Distribution of Future Y

|Question 1|What is the t variable obtained by standardizing β1?|
|---|---|
|Answer|The t variable obtained by standardizing β1 is based on the t variable obtained by standardizing + x∗.|

|Question 2|What does the variable T represent?|
|---|---|
|Answer|The variable T = βˆ0 + βˆ1x⇤ − (β0 + β1x⇤) = Yˆ − E( Yˆ ) = Yˆ − Y has a t distribution with n – 2 degrees of freedom.|
---
#
# Confidence Interval for Future Y

# Confidence Interval for Future Y

A probability statement involving this standardized variable can now be manipulated to yield a confidence interval for:

A 100(1 – α)% CI for the expected value of Y when x = x0 + Bx* + tα/2,n-2

This CI is centered at the point estimate for Y and extends out to each side by an amount that depends on the confidence level and on the extent of variability in the estimator on which the point estimate is based.

67
---
#

# Regression Analysis Example

# Regression Analysis Example

Corrosion of steel reinforcing bars is the most important durability problem for reinforced concrete structures.

Carbonation of concrete results from a chemical reaction that also lowers the pH value by enough to initiate corrosion of the rebar.

Representative data on x = carbonation depth (mm) and y = strength (MPa) for a sample of core specimens taken from a particular building follows:

|x (carbonation depth in mm)|y (strength in MPa)|
|---|---|
|...|...|

For the Confidence Interval (CI) for Y given X=x based on regression analysis, further calculations are required.
---
#
# Regression Analysis

|Example|8.0|15.0|CI for 16.520.0Y|X=x 20.0 based on regression|27.|30.0|30.0|35.0|cont’d|
|---|---|---|---|---|---|---|---|---|
|V|22.8|27.2|23.7|17.1|21.5|18.6|16.1|23.4|13.4|
| |38.0|40.0|45.0|50.0|50.0|55.0|55.0|59.0|65.0|
|V|19.5|12.4|13.2|11.4|10.3|14.1|9.7|12.0|6.8|
| |Y = 27.1829 - 0.297561X| | | | | | | |
| |R-Sq 76.6%| | | | | | | |
| |Regression| | | | | | | |
| |95% CI| | | | | | | |
| |95% PI| | | | | | | |
| |10|20|30|40|50|60|70| |
| |depth|69| | | | | | |
---
|Question:|What is the task at hand in the given example?|
|---|---|
|Answer:|The task at hand in the given example is to calculate a 95% confidence interval for the mean strength for all core specimens having a carbonation depth of 45.|
---
#
# Prediction Interval for a Future Value of Y

# Prediction Interval for a Future Value of Y

Instead of calculating an interval estimate for Y, an investigator may wish to obtain a range or an interval of possible values of Y associated with some future observation when the independent variable has a value x∗.

Consider, for example, relating vocabulary size y to the age of a child x. The confidence interval with x∗ = 6 would provide a range that covers, with 95% confidence, the true average vocabulary size for all 6-year-old children.

Alternatively, we might wish an interval of plausible values for the vocabulary size of a particular 6-year-old child. How can you tell that a child is “off the chart,” for example?

71
---
#

# Prediction Interval for a Future Value of Y

# Prediction Interval for a Future Value of Y

A confidence interval refers to a parameter, or population characteristic, whose value is fixed but unknown to us.

In contrast, a future value of Y is not a parameter but instead a random variable; for this reason we refer to an interval of plausible values for a future Y as a prediction interval rather than a confidence interval.

Determining a prediction interval for Y requires that we model the error involved in the prediction of the Y variable.

72
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# A Prediction Interval for a Future Value of Y

The error of prediction is Y - Ŷ = Y - (β̂₀ + β̂₁x*), i.e. a difference between two random variables. Because the future value Y is independent of the observed Y’s, we have:

|Variance of prediction error|V[Y - (β̂₀ + β̂₁x*)]|
|---|---|
| |V(Y) - V(β̂₀ + β̂₁x*)|
| |σ² + σ²[1 + β̂₁ + β̂₀(x* - x)²]|
---
#
# Prediction Interval for a Future Value of Y

# A Prediction Interval for a Future Value of Y

Furthermore, because E(Y) = &beta;0 + &beta;1x* and expectation of

x* = &beta;0 + &beta;1x*, the expected value of the prediction

error is E(Y - (&beta;0 + &beta;1x*)) = 0.

It can then be shown that the standardized variable

T = sY&frasl;S - (&beta;&#770;0 + &#770;x*)&beta;1 = (Y - Y&#772; - Y&#772; ) - 0 = (Y - YSY - Y&#772;&#772;) - E(Y - Y)&#770;

1 + (xSxx* - x)1 + (xSxx* - x)2

has a t distribution with n - 2 df.

74
---
#

# Prediction Interval for a Future Value of Y

# A Prediction Interval for a Future Value of Y

Manipulating to isolate Y between the two inequalities yields the following interval.

Formula
Calculation

A 100(1 – α)% PI for a future Y observation to be made when x = x*
Bo + Bix* + ta/n-2 + (1 + 1 + (x* 3)2) / n S,xr

= Bo + B* + ta/2 n-2 52 + SBo + B;x*

= y + ta/n-2 s2 + S

Therefore, the prediction interval for a future value of Y when x = x* is given by the above calculations.
---
#
# Prediction Interval for a Future Value of Y

# Question:

What is the interpretation of the prediction level 100(1 – α)%?

Explain how the prediction interval (PI) differs from the confidence interval (CI).

What happens to the width of the CI and PI as n approaches infinity?

# Answer:

The interpretation of the prediction level 100(1 – α)% is that if it is used repeatedly, in the long run the resulting interval will actually contain the observed y values 100(1 – α)% of the time.

The prediction interval (PI) is wider than the confidence interval (CI) due to the 1 underneath the initial square root symbol. Both intervals are centered at + x∗.

As n approaches infinity, the width of the CI approaches 0, whereas the width of the PI does not decrease because even with perfect knowledge of β0 and β1, there will still be randomness in prediction.
---
#

# Question

# Question:

Return to the carbonation depth strength data example and calculate a 95% Prediction Interval (PI) for a strength value that would result from selecting a single core specimen whose depth is 45 mm.

Given the regression model, what would be the 95% Prediction Interval (PI) for Y|X=x based on the data?
---
#

# Residuals and Standardized Residuals

# Residuals and Standardized Residuals

The standardized residuals are given by:

Standardized Residual Formula
et = (Yi - yi) / (Sxr * sqrt(1 - hii))

Where:

- et = Standardized Residual
- Yi = Observed Value
- yi = Predicted Value
- Sxr = Residual Standard Deviation
- hii = Leverage

If a particular standardized residual is 1.5, then the residual itself is 1.5 (estimated) standard deviations larger than what would be expected from fitting the correct model.

Note: The standardized residuals help in identifying outliers and influential data points in regression analysis.
---
#

# Diagnostic Plots

# Diagnostic Plots

The basic plots that many statisticians recommend for an assessment of model validity and usefulness are the following:

1. ei* (or e) on the vertical axis versus xi i on the horizontal axis
2. ei* (or e) on the vertical axis versus yi on the horizontal axis
3. y on the vertical axis versus yi on the horizontal axis

4. A histogram of the standardized residuals
---
#

# Diagnostic Plots

# Diagnostic Plots

Plots 1 and 2 are called residual plots (against the independent variable and fitted values, respectively), whereas Plot 3 is fitted against observed values.

Provided that the model is correct, neither residual plots should exhibit distinct patterns.

The residuals should be randomly distributed about 0 according to a normal distribution, so all but a very few standardized residuals should lie between –2 and +2 (i.e., all but a few residuals within 2 standard deviations of their expected value 0).

If Plot 3 yields points close to the 45 deg line [slope +1 through (0, 0)], then the estimated regression function gives accurate predictions of the values actually observed.

80
---
#

table {
width: 100%;
border-collapse: collapse;
}
table, th, td {
border: 1px solid black;
}
th, td {
padding: 10px;
text-align: left;
}

# Example (Plot Type #2 and #3)

| |2.0|
|---|---|
|580| |
| |1.0|
| |0.0|
|Standardized|residuals|
|240|=1.0|
|VS. x| |
|VS. y|~2.0|
|100| |
|100|340|680|40|240|400|
| |81|
---
#

# Heteroscedasticity

# Heteroscedasticity

The residual plot below suggests that, although a straight line relationship may be reasonable, the assumption that V(Y) = σ2 for each i is of doubtful validity.

Using advanced methods like weighted LS (WLS), or more advanced models, is recommended for inference.
