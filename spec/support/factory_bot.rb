require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    first_name { 'john' }
    last_name { 'smith' }
    username { 'jsmitty' }
    password { 'password' }
    password_confirmation { 'password' }
  end

end
