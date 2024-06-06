<?php

namespace Steliosn1\Plugin;

use Closure;
use Filament\Forms\Components\Field;
use stdClass;

class Plugin extends Field
{
    protected string $view = 'plugin::plugin';

    protected array|Closure $labels = [];

    protected array|Closure $annotations = [];

    protected array|Closure $predictions = [];

    protected string|Closure $text = '';
    protected string|Closure $config = '';


    public function setLabels(array|Closure $labels): static
    {
        if (!is_array($labels)) {
            $this->labels = $labels;

            return $this;
        }

        foreach ($labels as $label) {
            if (!in_array($label, $this->labels)) {
                $this->labels[] = $label;
            }
        }

        return $this;
    }

    public function setAnnotations(array|Closure $annotations): static
    {
        $this->annotations = $annotations;

        return $this;
    }

    public function getLabels(): ?array
    {

        return $this->evaluate($this->labels);
    }

    public function getAnnotations(): ?array
    {
        return $this->evaluate($this->annotations);
    }

    public function setText(string|Closure $text): static
    {
        $this->text = $text;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->evaluate($this->text);
    }

    public function getViewLabels(): ?array
    {
        $labels = [];
        foreach ($this->getLabels() as $label) {
            $labels[] = [
                'name' => $label,
                'color' => $this->genColorCodeFromText($label),
            ];
        }

        return $labels;
    }



    public function genColorCodeFromText($text)
    {
        $hash = md5($text);  //Gen hash of text
        $colors = [];
        for ($i = 0; $i < 3; $i++) {
            $colors[$i] = max([round(((hexdec(substr($hash, 9 * $i, 10))) / hexdec(str_pad('', 10, 'F'))) * 255), 100]);
        } //convert hash into 3 decimal values between 0 and 255

        if (100 > 0) {  //only check brightness requirements if min_brightness is about 100
            while (array_sum($colors) / 3 < 100) {  //loop until brightness is above or equal to min_brightness
                for ($i = 0; $i < 3; $i++) {
                    $colors[$i] += 10;
                }
            }
        }    //increase each color by 10

        $output = '';

        for ($i = 0; $i < 3; $i++) {
            $output .= str_pad(dechex($colors[$i]), 2, 0, STR_PAD_LEFT);
        }  //convert each color to hex and append to output

        return '#' . $output;
    }
}
