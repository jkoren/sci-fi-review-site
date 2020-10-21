Rails.application.routes.draw do
  devise_for :users
  resources :homes, only: [:index]
  
  root 'homes#index'

  get "/movies", to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index]
    end
  end
    
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
