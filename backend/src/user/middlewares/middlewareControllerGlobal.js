import middlewareController from './middlewaresController.js'

export default function middlewareControllerGlobal (resolvers, middlewaresArray = []) {
  const newResolvers = {
    Query: {},
    Mutation: {}
  }

  for (const key in resolvers.Query) {
    newResolvers.Query[key] = (_, args, context) => middlewareController(
      args,
      context,
      middlewaresArray,
      resolvers.Query[key]
    )
  }

  // Mapear las funciones en Mutation
  for (const key in resolvers.Mutation) {
    newResolvers.Mutation[key] = (_, args, context) => middlewareController(
      args,
      context,
      middlewaresArray,
      resolvers.Mutation[key]
    )
  }

  return newResolvers
}
