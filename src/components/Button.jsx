import { Spinner } from "../components/Spinner"

export const Button = ({ value, color, icon, handleOnClick, disabled, isLoading }) => {
    return (
        <button onClick={handleOnClick} type="button" className={`btn ${color ? color : "bg-success"}`} disabled={disabled || isLoading}>
            {isLoading ? <Spinner /> : <> {icon && <i className={`bi ${icon} me-2`} />} {value}</>}
        </button>
    )
}
