Tumblr::Application.routes.draw do

  resources :users
  resources :sessions

  resources :texts
  resources :photos
  resources :posts

  match '/posts', :controller => 'posts', :action => 'create', :constraints => {:method => 'OPTIONS'}

  get 'background', to: 'root#background'

  root to: "root#index"
end
