class Query < Types::BaseObject
	# Add root-level fields here.
	# They will be entry points for queries on your schema.

	field :ping, String, description: 'Ping query', null: false
	def ping
		'pong'
	end

end
