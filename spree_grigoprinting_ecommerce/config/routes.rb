Spree::Core::Engine.add_routes do
  # Add your extension routes here
  post '/price_flag' => 'price#calcola_bandiera', as: 'calcola_bandiera'

  resources :uploads

  # pagine statiche
  get '/home' => 'static#home'
  get '/contatti' => 'static#contatti'
  get '/fedelta' => 'static#fedelta'
  get '/home' => 'static#home'
  get '/privacy' => 'static#privacy'
  get '/tec' => 'static#tec'

  get '/admin/orders/:id/uploads' => 'admin/orders#approva_files'

  post '/line_item/:id/approvazione' => 'admin/line_items#approvazione'
  get '/line_item/:id/storico' => 'admin/line_items#storico'

  get '/user/modifica_password' => 'users#modifica_password'
  get '/user/modifica_email' => 'users#modifica_email'
  get '/user/modifica_dati_azienda' => 'users#modifica_dati_azienda'
  # post 'user/modifica_password' => 'users#modifica_password_save'
  # post 'user/modifica_email' => 'users#modifica_email_save'
  # post 'user/modifica_dati_azienda' => 'users#modifica_dati_azienda_save'
  get '/user/modifica_indirizzo/:id' => 'addresses#edit'
  get '/user/nuovo_indirizzo/:type' => 'addresses#new'
  post '/address/update' => 'addresses#update'
  post '/address/create' => 'addresses#create'
end
