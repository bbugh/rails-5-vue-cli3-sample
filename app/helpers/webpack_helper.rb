module WebpackHelper
  # Output a stylesheet <link> tag referencing a webpack source
  def webpack_css_tag(source)
    webpack_asset_tag :stylesheet_link_tag, source
  end

  # Output a javascript <script> tag referencing a webpack source
  def webpack_js_tag(source)
    webpack_asset_tag :javascript_include_tag, source
  end

  private

  def webpack_asset(source)
    @__webpack_manifest ||= JSON.parse(Rails.root.join('public', 'assets', 'client', 'manifest.json').read)
    @__webpack_manifest[source]
  end

  def webpack_asset_tag(type, source)
    path = webpack_asset(source)
    public_send(type, path, skip_pipeline: true) if path
  end
end
