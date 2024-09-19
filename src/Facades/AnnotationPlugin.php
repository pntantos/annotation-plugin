<?php

namespace Pntantos\Plugin\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \pntantos\AnnotationPlugin\AnnotationPlugin
 */
class AnnotationPlugin extends Facade
{
    protected static function getFacadeAccessor()
    {
        return \Pntantos\AnnotationPlugin\Plugin::class;
    }
}
