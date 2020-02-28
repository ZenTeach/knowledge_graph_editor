class BackendSchema < GraphQL::Schema
  mutation(Mutations)
  query(Query)

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST
	if Rails.env.development?
		use GraphQL::Backtrace
	end
  # Add built-in connections for pagination
  # use GraphQL::Pagination::Connections
end
