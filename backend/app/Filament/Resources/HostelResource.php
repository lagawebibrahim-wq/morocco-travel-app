<?php
namespace App\Filament\Resources;
use App\Models\Hostel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use App\Filament\Resources\HostelResource\Pages;
use Filament\Tables;
use Filament\Tables\Table;
class HostelResource extends Resource {
    protected static ?string $model = Hostel::class;
    protected static ?string $navigationIcon = 'heroicon-o-home';
    public static function form(Form $form): Form {
        return $form->schema([
            Forms\Components\Select::make('place_id')->relationship('place', 'name')->required(),
            Forms\Components\TextInput::make('name')->required(),
            Forms\Components\TextInput::make('price_per_day_mad')->numeric()->required()->label('Price per day (MAD)'),
            Forms\Components\TextInput::make('rating')->numeric()->minValue(0)->maxValue(5),
            Forms\Components\TextInput::make('image_url')->url()->label('Image URL'),
            Forms\Components\Toggle::make('is_featured')->label('Featured (paid listing)'),
        ]);
    }
    public static function table(Table $table): Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('place.name'),
            Tables\Columns\TextColumn::make('price_per_day_mad')->suffix(' MAD'),
            Tables\Columns\TextColumn::make('rating'),
            Tables\Columns\IconColumn::make('is_featured')->boolean(),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }
    public static function getPages(): array {
        return [
            'index' => Pages\ListHostels::class,
            'create' => Pages\CreateHostel::class,
            'edit' => Pages\EditHostel::class,
        ];
    }
}
