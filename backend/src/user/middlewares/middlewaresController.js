// Esta funcion funciona igual que la funcion .use de express
// para poder ejecutar middlewares antes de un controlador
export default function middlewareController (args, context, middlewareArray = [], controller) {
  let index = 0

  const next = () => {
    if (index === middlewareArray.length) return null
    const callback = middlewareArray[index]
    index++
    const params = {
      args,
      context,
      next
    }
    callback(params)
  }

  next()

  return controller({
    args,
    context
  })
}
