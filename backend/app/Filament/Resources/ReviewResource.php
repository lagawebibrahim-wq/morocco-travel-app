<?php
namespace App\Filament\Resources;
use App\Filament\Resources\ReviewResource\Pages;
use App\Models\Review;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
class ReviewResource extends Resource {
    protected static ?string $model = Review::class;
    protected static ?string $navigationIcon = 'heroicon-o-star';
    public static function form(Form $form): Form {
        return $form->schema([
            Forms\Components\Select::make('user_id')->relationship('user', 'name')->required(),
            Forms\Components\Select::make('place_id')->relationship('place', 'name')->required(),
            Forms\Components\TextInput::make('rating')->numeric()->minValue(1)->maxValue(5)->required(),
            Forms\Components\Textarea::make('comment')->rows(3),
        ]);
    }
    public static function table(Table $table): Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('user.name'),
            Tables\Columns\TextColumn::make('place.name'),
            Tables\Columns\TextColumn::make('rating'),
            Tables\Columns\TextColumn::make('comment')->limit(50),
        ])->actions([Tables\Actions\EditAction::make(), Tables\Actions\DeleteAction::make()]);
    }
    public static function getPages(): array { return ['index' => Pages\ListReviews::class, 'edit' => Pages\EditReview::class]; }
}
