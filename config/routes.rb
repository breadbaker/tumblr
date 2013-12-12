Tumblr::Application.routes.draw do

  resources :users
  resources :sessions

  resources :texts
  resources :posts

  get 'background', to: 'root#background'

  root to: "root#index"
end
