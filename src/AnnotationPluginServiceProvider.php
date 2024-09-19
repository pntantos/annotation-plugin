<?php

namespace Pntantos\AnnotationPlugin;

use Livewire\Livewire;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\PackageServiceProvider;
use Spatie\LaravelPackageTools\Package;
use Pntantos\AnnotationPlugin\Plugin;

class PluginServiceProvider extends PackageServiceProvider
{
    public static string $name = 'plugin';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name)
            ->hasViews()
            ->hasTranslations()
            ->hasAssets();
    }

    public function packageBooted(): void
    {
        Livewire::component('plugin', Plugin::class);

        FilamentAsset::register(
            assets: [
                AlpineComponent::make('annotation-plugin', __DIR__ . '/../resources/dist/annotation-plugin.js'),
                Css::make('index', __DIR__ . '/../resources/dist/index.css'),


            ],
            package: 'steliosn1/plugin'
        );
    }
}
