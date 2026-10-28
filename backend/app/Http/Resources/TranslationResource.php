<?php
namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;
class TranslationResource extends JsonResource {
    public function toArray($request): array { return ['id' => $this->id, 'locale' => $this->locale, 'key' => $this->key, 'value' => $this->value]; }
}
