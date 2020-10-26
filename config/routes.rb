Rails.application.routes.draw do
  devise_for :users
  
  root 'homes#index'
  get "/movies", to: "homes#index"
  get "/movies/new", to: "homes#index"
  get "/movies/:id", to: "homes#index"

  namespace :api do
    namespace :v1 do
      resources :movies, only: [:index, :show, :create] do 
        resources :reviews, only: [:show, :create]
      end 
    end
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

