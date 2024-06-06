@php
    $id = $getId();
    $isDisabled = $isDisabled();
    $name = $getName();
    $text = $getText();
    $labels = $getViewLabels();
@endphp

<x-dynamic-component :component="$getFieldWrapperView()" :field="$field">
    <div x-ignore ax-load
        ax-load-src="{{ \Filament\Support\Facades\FilamentAsset::getAlpineComponentSrc('plugin', 'steliosn1/plugin') }}"
        x-data="initializeDocument({
            {{-- state: $wire.$entangle('{{ $getStatePath() }}'), --}}
            {{-- labels: @js($labels), --}}
            elementId: $refs.titlename,
            labelsId: $refs.labels,
        
        })">

        <div x-ref="labels" x-data="{ labels: @js($labels) }">
            <template x-for="label in labels" :key="label.name">
                <label class="radio-label" x-bind:style="{ 'background-color': label.color }">
                    <input id="radio" type="radio" name="label" class="radio"
                        x-on:click="selectedLabel = label.name; updateLabel(label.name, label.color)" />
                    <span x-text="label.name"></span>
                </label>
            </template>
        </div>

        <p wire:ignore x-ref="titlename" x-data="{ text: @js($text) }" readonly x-text="text" class="w-full titlename">
        </p>
    </div>
</x-dynamic-component>
