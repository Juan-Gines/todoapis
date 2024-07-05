const RedPill = ({ text }) => (
  <div className="bg-red-200 text-red-900 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-red-400 border border-red-400">
    <span>{text}</span>
  </div>
)
const BluePill = ({ text }) => (
  <div className="bg-blue-200 text-blue-900 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
    <span>{text}</span>
  </div>
)
const GreenPill = ({ text }) => (
  <div className="bg-green-200 text-green-900 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400">
    <span>{text}</span>
  </div>
)
const YellowPill = ({ text }) => (
  <div className="bg-yellow-200 text-yellow-900 text-sm font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400">
    <span>{text}</span>
  </div>
)

export { 
  RedPill,
  BluePill,
  GreenPill,
  YellowPill
}