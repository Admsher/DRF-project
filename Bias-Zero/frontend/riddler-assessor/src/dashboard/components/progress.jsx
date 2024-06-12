import React from 'react'

function Progress({per}) {
  return (
    <div>
        {/* <!-- Circular Progress --> */}
        <div class="relative size-40">
        <svg class="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            {/* <!-- Background Circle --> */}
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
            {/* <!-- Progress Circle inside a group with rotation --> */}
            <g class="origin-center -rotate-90 transform">
            {/* To progress bar to show 72%, we need to write 100-72 in stroke-dashoffset, if 0-it displays 100% progress
                *It means we need to write the remaining from to total to show how much it occupied.
            */}
            <circle cx="18" cy="18" r="16" fill="none" class="stroke-current text-blue-600 dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="1"></circle>
            </g>
        </svg>
        {/* <!-- Percentage Text --> */}
        <div class="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span class="text-center text-2xl font-bold text-gray-800 dark:text-white">72%</span>
        </div>
        </div>
        {/* <!-- End Circular Progress --> */}
    </div>
  )
}

export default Progress