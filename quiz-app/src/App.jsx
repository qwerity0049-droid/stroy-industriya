import ProcessWithSlider from './ProcessWithSlider'
import Quiz from './Quiz'
import Partners from './Partners'

export default function App() {
  return (
    <>
      <div className="bg-slate-50 px-6 md:px-4 py-12 md:py-16">
        <Quiz />
      </div>
      <div className="bg-slate-50 px-6 md:px-4 pb-12 md:pb-16 lg:pb-20">
        <ProcessWithSlider />
      </div>
      <Partners />
    </>
  )
}
