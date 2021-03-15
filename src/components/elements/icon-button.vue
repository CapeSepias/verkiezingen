<script>
    import inlineSvg from '@/components/elements/inline-svg';
    import translate from '@/components/elements/translate';

    export default {
        name: 'icon-button',
        components: {
            inlineSvg, translate
        },
        props: {
            src: {
                type: String,
                required: true
            },
            size: {
                type: Number,
                required: false,
                default: 3
            },
            label: {
                type: String,
                required: false,
                default: ''
            }
        },
        computed: {},
        methods: {}
    }
</script>


<template>
    <div
        :class="{
            'icon-button--size-1': size === 1,
            'icon-button--size-2': size === 2
        }"
        class="icon-button">
        <div class="icon-button__icon">
            <inline-svg :src="'assets/img/tools/' + src"/>
        </div>

        <div v-if="label.length"
            class="icon-button__label">
            <translate :word="label"/>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .icon-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .icon-button__icon {
            width: 40px;
            height: 40px;
            flex-grow: 0;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;

            svg {
                width: 24px;
                height: 24px;

                path {
                    fill: #000;
                }
            }
        }

        .icon-button__label {
            white-space: nowrap;
            margin-left: 8px;
            font-size: 15px;
            line-height: 1;
        }

        &.icon-button--size-1 {

            .icon-button__icon {
                width: 24px;
                height: 24px;

                svg {
                    width: 16px;
                    height: 16px;
                }
            }
        }

        &:hover {

            .icon-button__icon {
                animation: animation-inverted 1.5s forwards;
            }

        }
    }

    @keyframes highlight {
        0%    {background: rgba(255,255,255,0);}
        10%   {background: rgba(255,255,255,0.5);}
        100%  {background: rgba(255,255,255,0.3);}
    }

    @keyframes animation-inverted {
        0%    {background: rgba(180,180,180,0);}
        10%   {background: rgba(180,180,180,0.5);}
        100%  {background: rgba(180,180,180,0.3);}
    }

    @keyframes animation-on-white {
        0%    {background: rgba(200,200,200,0);}
        10%   {background: rgba(200,200,200,0.5);}
        100%  {background: rgba(200,200,200,0.3);}
    }
</style>