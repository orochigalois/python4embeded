import { useState } from "react"
import { fetchAPI } from "utils/api"
import NextImage from "../elements/image"
import * as yup from "yup"
import { Formik, Form, Field } from "formik"
import Button from "../elements/button"

const ContactForm = ({ data }) => {
  const [loading, setLoading] = useState(false)
  const ContactSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  return (

    <section className="flex flex-wrap overflow-hidden max-w-screen-xl w-screen mx-auto py-24 justify-between px-5">


      <div className="w-full overflow-hidden md:w-1/2">
        <div className="max-w-sm mx-auto">
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

            alert("done!")

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
                <p className="text-red-500 h-12 text-sm mt-1 ml-1 text-left">
                  {(errors.name && touched.name && errors.name) || errors.api}
                </p>
                <Field
                  className="w-full md:w-1/2 text-base focus:outline-none py-3 px-4 border-blue-400 border-2 rounded-md"
                  type="email"
                  name="email"
                  placeholder='Email'
                />
                <p className="text-red-500 h-12 text-sm mt-1 ml-1 text-left">
                  {(errors.email && touched.email && errors.email) || errors.api}
                </p>
                <Field
                  name="message"
                  className="w-full md:w-1/2 text-base focus:outline-none py-3 px-4 border-blue-400 border-2 rounded-md"
                  as="textarea"
                  placeholder="Message"
                />

                <Button
                  className={"block"}
                  type="submit"
                  button={data.submitButton}
                  disabled={isSubmitting}
                  loading={loading}
                />
              </Form>

            </div>
          )}
        </Formik>
      </div>

    </section>
  )
}

export default ContactForm
