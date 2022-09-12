import NextImage from "../elements/image"

const ContactForm = ({ data }) => {
  return (

    <section className="flex flex-wrap overflow-hidden max-w-screen-xl mx-auto py-24 justify-between px-5">
      <div className="w-full overflow-hidden">
        <h2 className="title text-center mb-20">{data.title}</h2>
      </div>

      <div className="w-full overflow-hidden md:w-1/2 md:max-w-md mb-10 md:mb-0">
        <div className="mt-10">
          test
        </div>
      </div>

      <div className="w-full overflow-hidden md:w-1/2">
        <NextImage media={data.image} />
      </div>

    </section>
  )
}

export default ContactForm
