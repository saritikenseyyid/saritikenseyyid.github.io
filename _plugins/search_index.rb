# Erst nach dem Rendern indexieren: Dadurch werden auch eingebundene
# Markdown-Dateien und Liquid-Ausdrücke als lesbarer Text durchsucht.
require "json"
require "cgi"

Jekyll::Hooks.register :site, :post_render do |site|
  index_page = site.pages.find { |page| page.name == "search.json" }
  next unless index_page

  base = site.baseurl.to_s.sub(%r{/$}, "")
  documents = site.posts.docs + site.pages
  entries = documents.map do |document|
    next if document.data["search"] == false
    next if document.data["published"] == false
    output = document.output.to_s
    # Nur der Artikel, ohne Navigation, Einstellungen und Dialoge.
    article = output[/<article\b[^>]*\bid="start"[^>]*>(.*?)<\/article>/m, 1]
    next unless article

    text = article.gsub(/<(script|style)\b[^>]*>.*?<\/\1>/m, " ")
                  .gsub(/<[^>]+>/, " ")
    text = CGI.unescapeHTML(text).gsub(/[[:space:]]+/, " ").strip
    {
      "title" => document.data["title"] || site.config["title"],
      "url" => base + document.url,
      "description" => document.data["description"] || site.config["description"],
      "text" => text,
      "kind" => document.is_a?(Jekyll::Document) ? "Beitrag" : "Seite"
    }
  end
  index_page.output = JSON.pretty_generate(entries.compact)
end
