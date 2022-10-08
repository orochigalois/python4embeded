import classNames from "classnames"
import PropTypes from "prop-types"
import { buttonLinkPropTypes } from "utils/types"
import CustomLink from "./custom-link"

const ButtonContent = ({ button, appearance, compact, onClick}) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        // Common classes
        "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
        // Full-size button
        {
          "px-8 py-4": compact === false,
        },
        // Compact button
        {
          "px-6 py-2": compact === true,
        },
        // Specific to when the button is fully dark
        {
          "bg-white text-white border-white": appearance === "dark",
        },
        // Specific to when the button is dark outlines
        {
          "text-white border-white": appearance === "dark-outline",
        },
        // Specific to when the button is fully white
        {
          "bg-white text-white border-white": appearance === "white",
        },
        // Specific to when the button is white outlines
        {
          "text-white border-white": appearance === "white-outline",
        }
      )}
    >
      {button.text}
    </div>
  )
}

const ButtonLink = ({ button, appearance, compact = false ,onClick}) => {
  return (
    <CustomLink link={button}>
      <ButtonContent
        button={button}
        appearance={appearance}
        compact={compact}
        onClick={onClick}
      />
    </CustomLink>
  )
}

ButtonLink.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf([
    "dark",
    "white-outline",
    "white",
    "dark-outline",
  ]),
  compact: PropTypes.bool,
}

export default ButtonLink
