const LandingPage = ({login}) => {
  return (
    <>
        <section className="flex w-full h-screen flex-col justify-center items-center">
            <h1 className="text-center text-2xl font-semibold text-success">Welcome to ToDo App</h1>
            <button onClick={login} className="btn btn-outline btn-error !px-5 whitespace-nowrap font-semibold my-4">Login to Continue</button>
        </section>
    </>
  )
}

export default LandingPage