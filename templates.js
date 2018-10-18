var templates = _.mapObject({
	weatherBlock:       `<h1>Weather in {{ city }}</h1>
                        <h2>{{ description }}</h2>
                        <div class="details-block"></div>`,
    weatherDetails:     `<div class="current temp">{{ temp }}</div>
                        <div class="range-container">
                            <div class="temp range"><div class="label">Low</div><div class="degrees">{{ low }}</div></div>
                            <div class="temp range"><div class="label">High</div><div class="degrees">{{ high }}</div></div>
                        </div>`,
    vidBG:              `<div class="fullscreen-bg">
                            <video loop muted autoplay poster="{{ jpg }}" class="fullscreen-bg__video">
                                <source src="{{ webm }}" type="video/webm">
                                <source src="{{ mp4 }}" type="video/mp4">
                            </video>
                        </div>`
}, function(template) {
	return nunjucks.compile(template);
});