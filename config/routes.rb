Tumblr::Application.routes.draw do

  resources :users
  resources :sessions

  resources :texts
end
