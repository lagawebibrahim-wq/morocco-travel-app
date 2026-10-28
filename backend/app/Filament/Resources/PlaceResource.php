<?php
namespace App\Filament\Resources;
use App\Models\Place;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use App\Filament\Resources\PlaceResource\Pages;
use Filament\Tables;
use Filament\Tables\Table;
class PlaceResource extends Resource {
    protected static ?string $model = Place::class;
    protected static ?string $navigationIcon = 'heroicon-o-map-pin';
    public static function form(Form $form): Form {
        return $form->schema([
            Forms\Components\Select::make('city_id')->relationship('city', 'name')->required(),
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('location')->required(),
            Forms\Components\TextInput::make('distance_km')->numeric()->required()->label('Distance (Km)'),
            Forms\Components\TextInput::make('rating')->numeric()->minValue(0)->maxValue(5),
            Forms\Components\TextInput::make('travelers_count')->numeric()->default(15),
            Forms\Components\TextInput::make('image_url')->url()->label('Image URL'),
            Forms\Components\Textarea::make('description'),
        ]);
    }
    public static function table(Table $table): Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('city.name'),
            Tables\Columns\TextColumn::make('location'),
            Tables\Columns\TextColumn::make('distance_km')->suffix(' Km'),
            Tables\Columns\TextColumn::make('rating'),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }
    public static function getPages(): array {
        return [
            'index' => Pages\ListPlaces::class,
            'create' => Pages\CreatePlace::class,
            'edit' => Pages\EditPlace::class,
        ];
    }
}
