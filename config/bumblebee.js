module.exports = {
  /*
   * When enabled, Bumblebee will automatically parse the ?include=
   * parameter and include all requested resources
   */
  parseRequest: false,

  /*
   * Nested includes will be resolved up to this limit any further nested
   * resources are going to be ignored
   */
  includeRecursionLimit: 10,

  /*
   * The serializer will be used to transform the data into its final
   * representation.
   * Currently supported: 'plain', 'data'
   */
  serializer: 'data',

  /*
   * When a transformer is referred to by its name only, Bumblebee will try to
   * resolve the transformer using this namespace as prefix.
   */
  namespace: 'App/Transformers',
};
