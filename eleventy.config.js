module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  // Auto-generate a 3 sentence excerpt from a post's rendered HTML content
  eleventyConfig.addFilter("excerpt", function(content) {
    if (!content) return "";
    const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    return sentences.slice(0, 3).join(" ").trim();
  });

  eleventyConfig.addFilter("readableDate", function(dateObj) {
    const d = new Date(dateObj);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  });

  eleventyConfig.addFilter("isoDate", function(dateObj) {
    const d = new Date(dateObj);
    return d.toISOString().slice(0, 10);
  });

  eleventyConfig.addFilter("readableDateTime", function(dateObj) {
    const d = new Date(dateObj);
    return d.toLocaleString("en-US", {
      day: "numeric", month: "long", year: "numeric",
      hour: "numeric", minute: "2-digit", timeZoneName: "short",
    });
  });

  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    }
  };
};
