interface Props {
  message: string
}

function ErrorMessage({ message }: Props) {
  return (
    <p role="alert" className="rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-red-300">
      {message}
    </p>
  )
}

export default ErrorMessage
