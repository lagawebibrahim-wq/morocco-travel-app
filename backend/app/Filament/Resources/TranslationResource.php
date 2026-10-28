<?php
namespace App\Filament\Resources;
use App\Filament\Resources\TranslationResource\Pages;
use App\Models\Translation;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
class TranslationResource extends Resource {
    protected static ?string $model = Translation::class;
    protected static ?string $navigationIcon = 'heroicon-o-language';
    public static function form(Form $form): Form {
        return $form->schema([
            Forms\Components\Select::make('locale')->options(['ar' => 'العربية', 'fr' => 'Français', 'en' => 'English'])->required(),
            Forms\Components\TextInput::make('key')->required()->maxLength(255),
            Forms\Components\Textarea::make('value')->required()->rows(2),
        ]);
    }
    public static function table(Table $table): Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('locale')->searchable(),
            Tables\Columns\TextColumn::make('key')->searchable(),
            Tables\Columns\TextColumn::make('value')->limit(60),
        ])->filters([Tables\Filters\SelectFilter::make('locale')->options(['ar' => 'العربية', 'fr' => 'Français', 'en' => 'English'])])
        ->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }
    public static function getPages(): array {
        return ['index' => Pages\ListTranslations::class, 'create' => Pages\CreateTranslation::class, 'edit' => Pages\EditTranslation::class];
    }
}
