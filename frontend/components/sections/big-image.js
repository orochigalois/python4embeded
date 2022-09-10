import NextImage from "../elements/image"

const BigImage = ({ data }) => {
  console.log(data)
  return (

    <section className={`w-full ${!data?.BlackBackground ? '' :"bg-black"} p-24`}>
      <div className="max-w-3xl m-auto">
        <NextImage media={data.Image} />
      </div>

    </section>

  )
}

export default BigImage
