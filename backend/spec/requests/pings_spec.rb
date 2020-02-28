# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'PingRequests', type: :request do
  subject do
    post '/graphql',
         { params: { query: query, variables: variables.to_json }.to_json,
           headers: { 'CONTENT-TYPE': 'application/json' } }
  end
  let(:query) do
    '{
      ping
     }'
  end

  let(:variables) do
    {}
  end

  describe 'valid request' do
    before do
      subject
    end
    let(:expectation) do
      {
        'data' => {
          'ping' => 'pong'
        }
      }
    end
    it 'succeeds' do
      expect(JSON.parse(response.body)).to eql(expectation)
    end
  end
end
