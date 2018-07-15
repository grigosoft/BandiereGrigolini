Rails.application.routes.draw do
  # This line mounts Spree's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to
  # Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the
  # :at option to something different.
  #
  # We ask that you don't use the :as option here, as Spree relies on it being
  # the default of "spree".
  mount Spree::Core::Engine, at: '/'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  # Add your extension routes here
  post '/price_flag' => 'price#calcola_bandiera'
  post '/price_beachflag' => 'price#calcola_beachflag'
  post '/price_fialri' => 'price#calcola_filari'

  resources :uploads

  # pagine statiche
  get '/home' => 'static#home'
  get '/contacts' => 'static#contatti'
  get '/fidelity' => 'static#fedelta'
  get '/privacy' => 'static#privacy'
  get '/tec' => 'static#tec'

  get '/admin/orders/:id/uploads' => 'admin/orders#approva_files'

  post '/line_item/:id/approvazione' => 'admin/line_items#approvazione'
  get '/line_item/:id/storico' => 'admin/line_items#storico'

  get '/account' => 'users#profilo_utente'
  get '/account/user' => 'users#profilo_utente'
  get '/account/addresses' => 'users#profilo_indirizzi'
  get '/account/orders' => 'users#profilo_ordini'
  # get '/account/orders/:id' => 'orders#show'
  # get '/account/password/edit' => 'users#modifica_password'
  # get '/account/email/edit' => 'users#modifica_email'
  # get '/account/corporate_data/edit' => 'users#modifica_dati_azienda'
  # post 'user/modifica_password' => 'users#modifica_password_save'
  # post 'user/modifica_email' => 'users#modifica_email_save'
  # post 'user/modifica_dati_azienda' => 'users#modifica_dati_azienda_save'

end
