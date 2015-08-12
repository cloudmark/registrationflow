use Rack::Static,
:urls => ["/fonts", "/images", "/styles", "/scripts"],
:root => 'public',
:header_rules => [
    # Cache all static files in public caches (e.g. Rack::Cache)
    #  as well as in the browser
    [:all, {'Cache-Control' => 'public, max-age=31536000'}],
    
    # Provide web fonts with cross-origin access-control-headers
    #  Firefox requires this when serving assets using a Content Delivery Network
    [:fonts, {'Access-Control-Allow-Origin' => '*'}]
]

run lambda { |env|
  [
    200,
    {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'no-cache',
        'Pragma'        => 'no-cache',
        'Expires'       => '-1'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}