<?php

namespace Pntantos\AnnotationPlugin\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \pntantos\AnnotationPlugin\AnnotationPlugin
 */
class AnnotationPlugin extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Pntantos\AnnotationPlugin\AnnotationPlugin::class;
    }
}
