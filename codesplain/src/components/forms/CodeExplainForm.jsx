import { useState } from 'react'
import { useActionState } from 'react'
import { explain } from '../../actions'
import CodeExplanation from '../CodeExplanation'
import Error from '../Error'

const CodeExplainForm = () => {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")

  const [formState, formAction, isPending] = useActionState(explain, null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("code", code)
    formData.set("language", language)
    formAction(formData)
  }

  return (
    <div className='w-full max-w-4xl'>
      <form onSubmit={handleSubmit} className='bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-2xl'>
        <label className='block mb-2 font-semibold text-gray-300'>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='border border-gray-600 bg-gray-800 text-white rounded-lg p-2.5 w-full mb-5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none'
        >
          <option value="javascript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="java">Java</option>
        </select>

        <label className='block mb-2 font-semibold text-gray-300'>Your Code:</label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          placeholder='Paste your code here...'
          className='text-white border border-gray-600 rounded-lg w-full p-3 font-mono text-sm bg-gray-800 min-h-[200px] resize-y focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none'
        />

        <button
          type="submit"
          disabled={isPending}
          className="mt-4 px-10 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 active:scale-95 active:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-emerald-500/25"
        >
          {isPending ? "Explaining..." : "Explain Code"}
        </button>
      </form>

      {isPending && (
        <div className='mt-6 bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-2xl'>
          <div className='flex items-center gap-3 text-gray-400'>
            <div className='animate-spin w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full' />
            <span>Analyzing your code...</span>
          </div>
        </div>
      )}

      {formState?.success && !isPending && (
        <CodeExplanation explanation={formState.data.explanation} />
      )}

      {formState?.success === false && !isPending && (
        <Error error={formState.error} />
      )}
    </div>
  )
}

export default CodeExplainForm
