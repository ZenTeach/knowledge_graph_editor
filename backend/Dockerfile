FROM ruby:2.6.5-slim

RUN apt-get update -qq && apt-get install -y build-essential git

# install libraries nokogiri and nodejs
RUN apt-get install -y libxml2-dev libxslt1-dev

ENV APP_HOME /app
ENV BUNDLER_VERSION 1.17.2

RUN mkdir $APP_HOME

WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/

RUN gem install bundler -v 1.17.2

ADD . $APP_HOME

RUN bundle install

CMD ["rails", "server", "-b", "0.0.0.0"]
