Spree::Core::Engine.add_routes do
  # Add your extension routes here
  post "/price_flag" => "price#calcola_bandiera" , as: "calcola_bandiera"
end
