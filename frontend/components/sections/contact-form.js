import { useState } from "react"
import { fetchAPI } from "utils/api"
import NextImage from "../elements/image"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import BlueButton from "../elements/blue-button"

const ContactForm = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const ContactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  return (

    <section className="flex flex-wrap overflow-hidden max-w-7xl w-screen mx-auto py-24 justify-between px-5 border-t" id="contact">


      <div className="w-full overflow-hidden md:w-1/2">
        <div className="max-w-sm mx-auto pt-8">
          <NextImage media={data.image} />
        </div>
      </div>
      <div className="w-full overflow-hidden md:w-1/2">
        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={ContactSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setLoading(true)

            try {
              setErrors({ api: null })
              await fetchAPI(
                "/contact-form-submissions",
                {},
                {
                  method: "POST",
                  body: JSON.stringify({
                    data: {
                      name: values.name,
                      email: values.email,
                      message: values.message,
                    }
                  }),
                }
              )
            } catch (err) {
              setErrors({ api: err.message })
            }

            setSuccess(true)

            setLoading(false)
            setSubmitting(false)
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <div>
              <h2 className="title mb-20">{data.title}</h2>
              <Form className="">
                <Field
                  className="w-full md:w-1/2 text-base focus:outline-none py-3 px-4 border-blue-400 border-2 rounded-md"
                  type="text"
                  name="name"
                  placeholder='Name'
                />
                <p className="text-red-500 h-6 text-sm mt-1 ml-1 text-left">
                  {(errors.name && touched.name && errors.name) || errors.api}
                </p>
                <Field
                  className="w-full md:w-1/2 text-base focus:outline-none py-3 px-4 border-blue-400 border-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder='Email'
                />
                <p className="text-red-500 h-6 text-sm mt-1 ml-1 text-left">
                  {(errors.email && touched.email && errors.email) || errors.api}
                </p>
                <Field
                  name="message"
                  className="w-full md:w-1/2 text-base focus:outline-none py-3 px-4 border-blue-400 border-2 rounded-md h-36"
                  as="textarea"
                  placeholder="Message"
                />

                <div className="block mt-5">
                  <BlueButton isButton link={data.button} type="submit" disabled={isSubmitting} loading={loading}>
                    {data.button.text}
                  </BlueButton>
                </div>
                {
                  success&&<p className="text-base mt-2">Thanks for your feedback</p>
                }
              </Form>

            </div>
          )}
        </Formik>
      </div>

    </section>
  )
}

export default ContactForm
