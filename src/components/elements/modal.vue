<script>
    import InlineSvg from "../elements/inline-svg";
    export default {
        name: 'modal',
        components: {InlineSvg},
        props: {},
        computed: {
            message() {
                return this.$store.state.modal.message;
            },
            showConfirm() {
                return this.$store.state.modal.confirm;
            },
            confirmText() {
                return this.$store.state.modal.confirmYes;
            },
            refuteText() {
                return this.$store.state.modal.confirmNo;
            },
            confirmAction() {
                return this.$store.state.modal.confirmAction;
            },
            showModal() {
                return this.$store.state.modal.visible;
            },
            isWarning() {
                return this.$store.state.modal.warning;
            }
        },
        methods: {
            close() {
                this.$store.commit('modal/close');
            },
            confirm() {
                // check if it is a function
                if (this.confirmAction && {}.toString.call(this.confirmAction) === '[object Function]') {
                    this.confirmAction();
                } else {
                    console.log('Confirm callback is not a function.');
                }
                this.close();
            },
            refute() {
                this.close();
            }
        }
    }
</script>


<template>
    <div
        :class="{'popup--active': showModal}"
        class="cover">
        <div
            :class="{'modal--warning': isWarning}"
            class="modal">

            <div
                v-html="message"
                class="modal__body">
            </div>

            <div class="modal__footer">
                <div
                    v-if="showConfirm"
                    class="modal__confirm">
                    <div
                        @click="confirm()"
                        class="button button--medium">
                        {{confirmText}}
                    </div>
                    <div
                        @click="refute()"
                        class="button button--medium">
                    {{refuteText}}
                    </div>
                </div>
            </div>

            <div
                @click="close()"
                class="modal__close"></div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/styles/variables.scss';

    .modal {
        background-color: #fff;
        position: absolute;
        width: 650px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        top: 60px;
        transition: top 1s ease;
        box-shadow: 0 0 4px 0 rgba(0,0,0,0.40);

        &.modal--warning {
            color: red;
            font-weight: 700;
        }


        .modal__body {
            padding: 30px 50px;
            font-size: 16px;
        }

        .modal__footer {
            position: relative;
            padding: 8px 30px 30px 30px;
            display: flex;
            align-items: center;

            .modal__confirm {
                display: flex;
                align-items: center;
                width: 100%;
                justify-content: flex-end;
            }
        }

        @include ipad-pro-portrait() {
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .modal__close {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
        width: 24px;
        height: 24px;
        opacity: 0.8;
        text-align: center;
        border: 1px solid rgba(0, 0, 0,0.4);
        border-radius: 3px;

        &:before, &:after {
            position: absolute;
            left: 11px;
            top: 2px;
            content: ' ';
            height: 18px;
            width: 1px;
            background-color: #000;
        }

        &:before {
            transform: rotate(45deg);
        }
        &:after {
            transform: rotate(-45deg);
        }

        &:hover {
            opacity: 1;
        }
    }
</style>