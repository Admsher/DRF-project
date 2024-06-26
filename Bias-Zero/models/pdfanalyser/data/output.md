#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset
31

Dealing with over-fitting with pruning
33

# Practice Problems

Practice problems can be found on page 36.

© Alice Gao 2021 - v1.0 - Page 2 of 36
---
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

# Learning Goals

Learning Objectives
Describe pe components of a decision tree.
Construct a decision tree given an order of testing pe features.
Determine pe prediction accuracy of a decision tree on a test set.
Compute pe entropy of a probability distribution.
Compute pe expected information gain for selecting a feature.
Trace pe execution of and implement pe ID3 algoripm.

# Examples of Decision Trees

Our first machine learning algorithm will be decision trees. A decision tree is a very common algorithm that we humans use to make many different decisions. You may be using one without realizing it. Here are some examples of decision trees:

Example: Which language should you learn?

WHICH LANGUAGE
SHOULD YOU LEARN IN 2018?
USEFUL
USEFUL          OR            COOL
EASY               COOL?              HIPSTER
OR           HARD       HIPSTER         OR
HARD?   PHONETICS               EASY     SEXY
OR                  OR
GRAMMAR              HARD
EASY   PHONETICS GRAMMAR    EASY    HARD
MANDARIN                    RUSSIAN
Hola                                    SALUT
SPANISH      JAPANESE      SWEDISH       FRENCH

&copy; Alice Gao 2021 - v1.0 - Page 3 of 36
---
#
# Pet Selection Quiz

# Pet Selection Quiz

Question
Answer Choices

Are you likely to forget you have a pet?
YES / NO

Do you want a creature that returns your affection?
YES / NO

Do you want to watch your pet do things?
YES / NO

Do you want to train your pet to do things?
YES / NO

Do you own a large open field?
YES / NO
---
#
# Lecture 7

# CS 486/686 - Lecture 7

|Example:|Should you use emoji in a conversation?|
|---|---|
|©c Alice Gao 2021|v1.0 Page 5 of 36|
---
#

# Lecture 7 Example

# Example: Jeeves and Bertie Wooster

# Training Set

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

# Test Set

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

# Lecture 7

# CS 486/686 - Lecture 7

Section
Question
Answer

3.1
What is a decision tree?
A decision tree is a simple model for supervised classification used for classifying a single discrete target feature. Each internal node performs a Boolean test on an input feature, and each leaf node specifies a value for the target feature.

3.2
How do we classify an example using a decision tree?
To classify an example using a decision tree, we traverse down the tree, evaluating each test and following the corresponding edge. When a leaf is reached, we return the classification on that leaf.

3.2 - Example
Using the emoji decision tree example, how do we classify the given scenario?
Following the tree based on the given scenario (30 years old, work-related, accountant, not trying to get fired), we answer no, no, yes, no, and no. The leaf we reach is a thumb down, indicating we should not use emoji.

3.2 - Problem
If we convert a decision tree to a program, what does it look like?
A decision tree corresponds to a program with a big nested if-then-else structure.

© Alice Gao 2021 - v1.0 - Page 7 of 36
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

# 4. The Decision Tree Learning Algorithm

# 4.1 Issues in learning a decision tree

|Question:|What are the steps involved in building a decision tree given a data set?|
|---|---|
|Answer:|1. Decide on an order of testing the input features. 2. Build the decision tree by splitting the examples based on the tested input features.|

|Question:|What are the input features and target feature in the Jeeves training set?|
|---|---|
|Answer:|Input features: outlook, temperature, humidity, wind Target feature: whether Bertie decided to play tennis or not|

|Question:|What is the difference between making the optimal choice and the myopic best choice in decision tree building?|
|---|---|
|Answer:|The optimal choice considers the future implications of feature selection, while the myopic best choice only focuses on the current step without considering future steps.|

# 4.2 Grow a full tree given an order of testing features

|Question:|What is the consideration when deciding whether to grow a full tree or stop growing the tree earlier?|
|---|---|
|Answer:|The consideration is based on the trade-off between over-fitting and generalization to unseen test data. A smaller tree might generalize better, while a full tree may over-fit the training data.|
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

Feature
Branches

Outlook
Sunny, Overcast, Rain

Outlook = Sunny
Temp

Outlook = Rain
Wind

Other branches
Humidity before Wind

We have 9 positive and 5 negative examples. Based on the feature testing order, we split the examples into branches accordingly.
---
#

# Lecture 7 - Outlook

# Outlook

Branch
Feature
Decision

Middle
N/A
Leaf node with label Yes

Left
Temp
Test Temp next

In the middle branch, all the examples are positive. There is no need to test another feature, and so we may make a decision. We create a leaf node with the label Yes, and we are done with this branch.

Looking at the left branch next, there are two positive and three negative examples. We have to test another feature. Based on the given order, we will test Temp next. Temp has three values — Hot, Mild, and Cool. We create three branches again. The five examples are split between these branches.

We will repeat this process at every node. First, check if all the examples are in the same class. If they are, create a leaf node with the class label and stop. Otherwise, choose the next feature to test and split the examples based on the chosen feature.

&copy; Alice Gao 2021 - v1.0 - Page 10 of 36
---
#

# Decision Tree Lecture Summary

# Decision Tree Lecture Summary

# Outlook Decision Tree

|Temp|Yes|Wind|
|---|---|---|
|No|Humidity|Yes|Wind|
|No|Humidity|Yes|Yes|No|

# When do we stop?

There are three possible stopping criteria for the decision tree algorithm. The first case is when all examples belong to the same class. In this scenario, the decision of that class is made, and the process is completed.

# Base case 2: no features left

In the second case, when there are no more features to test, a decision needs to be made on how to proceed.

Problem: The training set has been modified to include 17 examples instead of 14. Let's construct one branch of the decision tree where Outlook is Sunny, Temperature is Mild, and Humidity is High.

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

# CS 486/686 Lecture 7

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

15
Sunny
Hot
High
Weak
No
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

Before deciding what to do, let's consider why we encountered the case where no examples were left:

Upon reviewing the modified data set, the specific case of Temperature being Hot, Wind being Weak, Humidity being High, and Outlook being Rain was not present in any example. This absence of observed feature value combinations leads to the inability to predict outcomes for such cases.

To address this situation, one approach is to look for similar examples. By examining the parent node, which contains examples for different Outlook values, we can consider those as the closest matches to our case. These parent node examples are likely to be diverse, making it challenging to make a definitive decision. Options include following the majority decision or making a choice based on a random draw from a probability distribution.

Temperature
Outlook
Humidity
Decision

Hot
Rain
High
No examples left

&copy; Alice Gao 2021 - v1.0 - Page 14 of 36
---
#

# Decision Tree Learner Algorithm

# Decision Tree Learner Algorithm

Here is the pseudocode for the algorithm:

Algoripm 1: Decision Tree Learner (examples, features)

1. if all examples are in pe same class pen
2. &nbsp;&nbsp;&nbsp;return pe class label.
3. else if no features left pen
4. &nbsp;&nbsp;&nbsp;return pe majority decision.
5. else if no examples left pen
6. &nbsp;&nbsp;&nbsp;return pe majority decision at pe parent node.
7. else
8. &nbsp;&nbsp;&nbsp;choose a feature f .
9. &nbsp;&nbsp;&nbsp;for each value v of feature f do
10. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build edge wip label v.
11. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;build sub-tree using examples where pe value of f is v.

The algorithm starts with three base cases:

1. If all the examples are in the same class, we will return the class label.
2. If there are no features left, we have noisy data. We can either return the majority decision or make a decision probabilistically.
3. If there are no examples left, then some combination of input features is absent in the training set. We can use the examples at the parent node to make a decision. If the examples are not in the same class, we can either return the majority decision or make a decision probabilistically.

Next, we have the recursive part. Suppose that we have a pre-specified order of testing the input features. At each step, we will split up the examples based on the chosen feature’s values. We will label the edges with the feature’s value. Each subtree only has examples where the value of the feature corresponds to the value on the edge.

There’s one crucial step left. So far, we have assumed that a pre-defined order of testing the input features. Where does this order come from? In practice, we have to choose this order ourselves.

&copy; Alice Gao 2021 - v1.0 - Page 15 of 36
---
#

# Lecture 7 - Determine the Order of Testing Features

# CS 486/686 - Lecture 7

# 5. Determine the Order of Testing Features

5.1 Which feature should we test at each step?

In machine learning, over-fitting can be a critical issue, especially for complex models pat capture bop useful patterns and noise in pe data. To avoid over-fitting, we aim to build a simple model wip minimal features to test. While finding pe optimal order of testing features is computationally expensive, we can use a greedy and myopic approach. This approach involves selecting pe feature pat makes pe biggest difference to classification or helps in making quick decisions at each step.

5.2 Identifying pe most important feature

To identify pe most important feature, we look for a feature pat reduces uncertainty and provides valuable information. The reduction in uncertainty is measured by calculating pe difference in uncertainty before and after testing pe feature. This information content is crucial in selecting pe feature wip pe highest value. Entropy, a concept from information peory, is used to measure uncertainty in a set of examples. Entropy is calculated based on pe probability distribution of outcomes, where each outcome's probability is multiplied by pe log base 2 of pe probability and summed togeper wip negation to yield a non-negative value.
---
#

# Entropy Calculation

# Entropy Calculation

Problem
What is the entropy of the distribution (0.5, 0.5)?

Options
(A) 0.2 (B) 0.4 (C) 0.6 (D) 0.8 (E) 1

Solution
The correct answer is (E).

Calculation
-(0.5 * log2(0.5)) * 2 = 1

Explanation
The entropy is 1 bit. A uniform distribution like this has a lot of uncertainty.

Problem
What is the entropy of the distribution (0.01, 0.99)?

Options
(A) 0.02 (B) 0.04 (C) 0.06 (D) 0.08
---
#

# Entropy Questions

# Entropy Questions

Problem
Solution

1. What is the maximum entropy of the distribution (p, 1 - p) where 0 ≤ p ≤ 1? 2. What is the minimum entropy of this distribution? 3. Plot the entropy of the distribution (p, 1 - p) with respect to p.
For any binary distribution, its entropy achieves its maximum value of one when the distribution is uniform, and achieves its minimum value of zero when the distribution is a point mass - one outcome has a probability of 1. When p is 0 or 1, calculating the entropy is a bit tricky, since log2(0) is undefined. In this case, let's consider the term 0 * log2(0) to be 0. This definition is reasonable since the limit of x * log2(x) is 0 when x approaches 0. Finally, here is the plot of the distribution's entropy with respect to p. As p increases from 0 to 1, the entropy increases first, reaches the maximum value when p is 0.5, and then decreases after that.
---
#

# Entropy and Information Gain

# Entropy and Information Gain

Below are some questions related to entropy and information gain:

# Question 1:

What are the maximum and minimum entropy for a distribution with three outcomes?

Number of Outcomes
Maximum Entropy
Minimum Entropy

3
1.585 bits
0 bits

# Question 2:

Define the expected information gain of testing a feature.

Expected information gain is the entropy of the examples before testing the feature minus the entropy of the examples after testing the feature.

# Question 3:

How is the expected information gain calculated for a feature with k values?

The expected information gain is calculated by first converting the examples before testing the feature into a binary distribution, then calculating the entropy of this distribution. After testing the feature, the entropy of k distributions is calculated to determine the overall information gain.
---
#

# Decision Tree Example

# Decision Tree Example

Problem:
What is the entropy of the examples before we select a feature for the root node of the tree?

Options:
(A) 0.54 (B) 0.64 (C) 0.74 (D) 0.84 (E) 0.94

Solution:
There are 14 examples: 9 positive, 5 negative. Applying the formula gives Hbefore = - (9 log2(9) + 5 log2(5)) / 14 = - (9 * (-0.637) + 5 * (-1.485)) / 14 = -(-0.939) ≈ 0.94.
---
#

# Questions and Answers

|Problem|Expected Information Gain|
|---|---|
|What is the expected information gain if we select Outlook as the root node of the tree?|<br/>Options|Expected Information Gain|
|(A)|0.237|
|(B)|0.247|
|(C)|0.257|
|(D)|0.267|
|(E)|0.277|

What is the expected information gain if we select Humidity as the root node of the tree?

|Options|Expected Information Gain|
|---|---|
|(A)|0.151|
|(B)|0.251|
---
#

# Lecture 7

# Question:

Which option is pe correct answer?

(A) 0.251

(B) 0.301

(C) 0.351

(D) 0.451

(E) 0.551

# Answer:

The correct answer is:
(A) 0.251
---
#

# Lecture 7

# CS 486/686 - Lecture 7

Case 1
Outlook = Sunny

Temp

Hot
+ : 9, 11
- : 1, 2, 8

Mild
+ : 11
- : 8

Cool
+ : 9
- :

Gain(Temp)
0.57

Humidity

High
+ :
- : 1, 2, 8

Normal
+ : 9, 11
- :

Gain(Humidity)
0.97

Wind

Weak
+ : 9
- : 11

Strong
+ : 1, 8
- : 2

Gain(Wind)
0.019

We pick Humidity since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Humidity.

|Case 2|Outlook = Overcast|
|---|---|
| |+ : 3, 7, 12, 13|- :|

© Alice Gao 2021 - v1.0 - Page 23 of 36
---
#

# Lecture 7

# Decision Tree Analysis

Case
Outlook
Temp
Humidity
Wind

3
Rain
Hot: + (4, 5, 10) - (6, 14) Mild: + (4, 10) - (14) Cool: + (5) - (6)
High: + (4) - (14) Normal: + (5, 10) - (6)
Weak: + (4, 5, 10) - Strong: + - (6, 14)

Gain(Temp) = I(2,3) - (3 * I(2,1) + 2 * I(1,1))

= 0.97 - 3(0.918) + 2(1)

= 0.97 - 0.9515

= 0.019

Gain(Humidity) = I(2,3) - (2 * I(1,1) + 3 * I(2,1))

= 0.97 - 2(1) + 3(0.918)

= 0.97 - 0.9515

= 0.019

Gain(Wind) = I(2,3) - (5 * I(3,3) + 5 * I(2,2))

= 0.97 - (3(0) + 2(0))

= 0.97 - 0

= 0.97

We pick Wind since it has the greatest expected information gain. This makes sense since the positive and negative examples are completely separated after testing Wind.

The final decision tree is drawn below:

© Alice Gao 2021 | v1.0 | Page 24 of 36
---
#
# Weather Outlook

# Weather Outlook

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

High
Normal

Yes
9, 11
4, 5, 10

No
1, 2, 8
6, 14

Weak
Strong

Yes

No
4, 5, 10

Recall that we wanted a shallow, small tree, and that’s exactly what we got.

© Alice Gao 2021 | v1.0 | Page 25 of 36
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

© Alice Gao 2021 - v1.0 - Page 27 of 36
---
#

# Lecture 7 Summary

# CS 486/686 - Lecture 7 Summary

# Handling a Real-Valued Feature

When dealing with a real-valued feature in decision tree construction, we have the following options:

1.
Discretize the feature
This involves putting examples into buckets. It's easy to do but may lead to loss of valuable information.

2.
Allow multi-way splits
Impractical due to the unbounded domain of the feature.

3.
Restrict to binary splits
Choose split points dynamically, but may result in deeper trees due to testing the same feature multiple times.

# Choosing a Split Point for a Real-Valued Feature

A naive and smarter approach to selecting split points:

Naive Approach:
Sort instances by feature, consider midpoints of consecutive values, and choose based on expected information gain.

Smarter Approach:
1. Sort instances by feature.
2. Identify possible split points as midway between different adjacent values.
3. Consider (X + Y)/2 as a split point if labels differ between X and Y.

Example: In the modified Jeeves dataset, there are 11 possible split points using the naive method.

&copy; Alice Gao 2021 - v1.0 - Page 28 of 36
---
#

# Information Gain and Split Points

# Information Gain and Split Points

Problem
Question

For the Jeeves training set, is the midpoint between 20.0 and 20.6 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.1 and 21.7 a possible split point?
(A) Yes (B) No

For the Jeeves training set, is the midpoint between 21.7 and 22.2 a possible split point?
(A) Yes (B) No

# Solutions

Problem
Solution

Midpoint between 20.0 and 20.6
The correct answer is (B). This is not a possible split point: L={Yes} and L={Yes}.

Midpoint between 21.1 and 21.7
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.

Midpoint between 21.7 and 22.2
The correct answer is (A). This is a possible split point: L={Yes} and L={No}.
---
#
# OCR Text

CS 486/686
Lecture 7

Solution: This is a possible split point: L = {No} and L = {No, Yes}.

21.7
22.2

The correct answer is (A).

Intuitively, you can understand this procedure as considering local changes at each midway point. If the target feature doesn’t change locally, that point probably isn’t a valuable split point.

© Alice Gao 2021 v1.0 Page 30 of 36
---
#

# Lecture 7: Over-fitting

# CS 486/686 - Lecture 7

# 7. Over-fitting

# 7.1 Corrupted data in the Jeeves dataset

Over-fitting is a common problem when learning a decision tree. Decision trees have several nice properties such as simplicity, ease of understanding, and interpretability.

Decision trees are preferred when the model needs to be explained to another human, unlike neural networks which are often complex and hard to interpret. Decision trees can also work well with small datasets, unlike neural networks which are prone to over-fitting with limited data.

Despite the advantages of decision trees, over-fitting remains a challenge during the construction process.

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

&copy; Alice Gao 2021 - v1.0 - Page 31 of 36
---
#

# Lecture 7 - Decision Tree Analysis

# Decision Tree Analysis

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

Test error is 0 out of 14.

Example: Suppose that you sent the training set and the test set to your friend. For some reason the data set gets corrupted during the transmission. Your friend gets a corrupted training set where only one data point is different. For this third data point, it changed from the label "yes" to the label "no". This is a tiny change to the training set, but how would this change affect the decision tree that we generate?

Decision tree generated by the learner algorithm:

© Alice Gao 2021 | v1.0 | Page 32 of 36
---
#

# Lecture 7 - Outlook and Dealing with Over-fitting with Pruning

# Lecture 7 - Outlook

Sunny
Overcast
Rain

Humidity
High
Normal

Normal
High

Wind
Weak

Strong

Yes
No

We grew an entire middle sub-tree to accommodate one corrupted data point, and this small corruption caused a dramatic change to the tree. This new tree is more complicated and it likely won’t generalize well to unseen data.

The decision tree learner algorithm is a perfectionist. The algorithm will keep growing the tree until it perfectly classifies all the examples in the training set. However, this is not necessarily a desirable behavior and this can easily lead to over-fitting.

The new test error is 2/14.

# Dealing with over-fitting with pruning

It would be better to grow a smaller and shallower tree. The smaller and shallower tree may not predict all of the training data points perfectly but it may generalize to test data better. At a high level we have two options to prevent over-fitting when learning a decision tree:

- Pre-pruning: stop growing the tree early.

If we decide not to split the examples at a node and stop growing the tree there, we may still have examples with different labels. At this point, we can decide to use the majority label as the decision for that leaf node. Here are some criteria we can use:

1. Maximum depth: We can decide not to split the examples if the depth of that node has reached a maximum value that we decided beforehand.
2. Minimum number of examples at the leaf node: We can decide not to split the examples if the number of examples remaining at that node is less than a predefined threshold value.

&copy; Alice Gao 2021 v1.0 Page 33 of 36
---
#

# Lecture 7 Summary

# Lecture 7 Summary

Below are key points discussed in Lecture 7:

1. Minimum information gain
We can decide not to split the examples if the expected information gain is less than the threshold.

2. Reduction in training error
We can decide not to split the examples if the reduction in training error is less than a predefined threshold value.

Pre-pruning involves splitting examples at a node only when it's useful, and it can be used with any of the criteria mentioned above.

Post-pruning strategy involves growing a full tree first and then trimming it afterwards. It is beneficial when multiple features working together are informative.

# Example:

Consider a data set with two binary input features and the target feature is the XOR function of the two input features.

For this example:

- With pre-pruning:
- - We will test none of the two input features as each feature alone provides zero information, resulting in a tree with only the root node predicting the target feature randomly.

With post-pruning:

Post-pruning is useful for cases where multiple features working together are beneficial, even if individual features are not informative. It can be applied to any of the described criteria, post-pruning a node only if it has leaf nodes as descendants.

&copy; Alice Gao 2021 - v1.0 - Page 34 of 36
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

|Example:|Suppose we are considering post-pruning with the minimal information gain metric.|
|---|---|
|Steps:|1. Restrict attention to nodes with leaf nodes as descendants.
2. If expected information gain < threshold, delete children (all leaf nodes) and convert node to leaf node.
3. Ensure examples with different labels at the node for majority decision.
|

&copy; Alice Gao 2021 - v1.0 - Page 35 of 36
---
#
# Practice Problems

# Practice Problems

1. When learning pe tree, we chose a feature to test at each step by maximizing pe expected information gain. Does pis approach allow us to generate pe optimal decision tree? Why or why not?

2. Consider a data-set wip real-valued features. Suppose pat we perform binary splits only when building a decision tree.

Is it possible to encounter pe “no features left” base case? Why?

Is it possible to encounter pe “no examples left” base case? Why?

3. What is pe main advantage of post-pruning over pre-pruning?

© Alice Gao 2021 - v1.0 - Page 36 of 36
#

# Decision Trees Lecture

# Lecture 7: Decision Trees

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
# Lecture 7

# CS 486/686 - Lecture 7

Topic
Page

Corrupted data in the Jeeves dataset