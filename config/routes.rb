Tumblr::Application.routes.draw do

  resources :users
  resources :sessions

  get '/follow_ids', to: 'users#follow_ids'
  post '/follow/:id', to: 'users#follow'

  post '/unfollow/:id', to: 'users#unfollow'

  resources :texts
  resources :photos
  resources :posts

  match '/posts', :controller => 'posts', :action => 'create', :constraints => {:method => 'OPTIONS'}

  get 'background', to: 'root#background'

  root to: "root#index"
end
