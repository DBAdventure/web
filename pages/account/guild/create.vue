<template>
    <div>
        <h1 class="title title-default">{{ $t('guild.create') }}</h1>

        <form id="guild-create-form" class="form-horizontal" method="post">
            {{ form_row(form.name) }}
            {{ form_row(form.shortName) }}
            {{ form_row(form.history) }}

            {{ form_widget(form._token) }}

            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">{{ $t('form.create') }}</button>
            </div>
        </form>
    </div>
</template>
