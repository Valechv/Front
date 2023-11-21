import Spinner from '../Spinner'

const Loading = () => {
  return (
    <div className="fixed w-screen h-screen grid place-items-center">
      <Spinner />
    </div>
  )
}

export default Loading
