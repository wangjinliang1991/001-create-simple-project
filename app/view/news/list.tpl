<!doctype html>
<html>
  <head>
    <title>CNode News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div id="content">
      <ul class="news-view view">
        {% for item in list %}
        <li class="item">
          <a class="user_avatar pull-left><img src="{{ item.author.avatar_url}}"></a>
          <span>《{{ item.title }}》</span>
        </li>
        {% endfor %}
      </ul>
      <div class="pagination">
      <ul>
        {% if page > 1 %}
        <li><a href="/news?page={{ page - 1 }}">←</a></li>
        {% endif %}
        <li><a href="/news?page={{ page + 1 }}">→</a></li>
      </ul>
    </div>
    </div>
      <div id="footer">
        <div id="footer_main">Powered by larry 2023</div>
    </div>
  </body>
</html>