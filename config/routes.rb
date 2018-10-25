Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :clients

  match '(*path)', to: 'clients#index', format: false, via: :get, as: :frontend_app
end
