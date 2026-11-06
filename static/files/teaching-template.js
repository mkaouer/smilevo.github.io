window.template = Handlebars.compile(`
{{#each .}}
<div class="row">
    <div class="col-lg-5" style="background-color: #33a5db; color: white; padding-top: 10px">
        <h1 class="card-heading">{{title}}</h1>
    </div>
</div>
{{#if note}}
<p class="text-muted mt-2">{{note}}</p>
{{/if}}
{{#if sourceURL}}
<p class="text-muted"><a href="{{sourceURL}}" target="_blank" rel="noopener noreferrer">Source: University of Michigan–Flint faculty directory</a></p>
{{/if}}
<div class="card-body">
    <div class="card-columns">
        {{#each data}}
        <div class="card">
            <div class="card-header">
                <h5>
                    {{#if url}}
                    <a href="{{url}}" target="_blank" rel="noopener noreferrer">{{title}}</a>
                    {{else}}
                    {{title}}
                    {{/if}}
                </h5>
            </div>
            {{#if imageURL}}
            <div class="card-body">
                <div style="width: 100%; text-align: center">
                    <img class="teaching-image" src="{{imageURL}}" alt="{{title}}">
                </div>
                {{#if description}}
                <div class="card-text">{{description}}</div>
                {{/if}}
            </div>
            {{else}}
            {{#if description}}
            <div class="card-body">
                <div class="card-text">{{description}}</div>
            </div>
            {{/if}}
            {{/if}}
            <div class="card-footer d-flex flex-row flex-wrap justify-content-center" style="background-color: #33a5db">
                {{#each author}}
                <div>
                    <a href="{{url}}" target="_blank" rel="noopener noreferrer">
                        <img class="rounded-circle profile" alt="{{name}}" title="{{name}}" src="{{image}}">
                    </a>
                </div>
                {{/each}}
            </div>
        </div>
        {{/each}}
    </div>
</div>
{{/each}}`);
