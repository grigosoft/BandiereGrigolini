Spree::Core::Engine.add_routes do
  # Add your extension routes here
  post "/price_flag" => "price#calculate_flag" , as: "calculate_flag"
end
