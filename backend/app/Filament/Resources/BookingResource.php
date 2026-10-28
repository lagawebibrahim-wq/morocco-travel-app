<?php
namespace App\Filament\Resources;
use App\Models\Booking;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use App\Filament\Resources\BookingResource\Pages;
use Filament\Tables;
use Filament\Tables\Table;
class BookingResource extends Resource {
    protected static ?string $model = Booking::class;
    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    public static function form(Form $form): Form {
        return $form->schema([
            Forms\Components\Select::make('user_id')->relationship('user', 'name')->required(),
            Forms\Components\Select::make('hostel_id')->relationship('hostel', 'name')->required(),
            Forms\Components\DatePicker::make('check_in')->required(),
            Forms\Components\DatePicker::make('check_out')->required(),
            Forms\Components\TextInput::make('guests')->numeric()->default(1),
            Forms\Components\TextInput::make('total_mad')->numeric()->required()->label('Total (MAD)'),
            Forms\Components\TextInput::make('commission_mad')->numeric()->label('Commission (MAD, 12%)'),
            Forms\Components\Select::make('payment_method')->options(['cash' => 'Cash on arrival', 'card' => 'Card'])->required()->default('cash'),
            Forms\Components\Select::make('status')->options(['pending' => 'Pending', 'confirmed' => 'Confirmed', 'cancelled' => 'Cancelled', 'completed' => 'Completed'])->required(),
        ]);
    }
    public static function table(Table $table): Table {
        return $table->columns([
            Tables\Columns\TextColumn::make('user.name'),
            Tables\Columns\TextColumn::make('hostel.name'),
            Tables\Columns\TextColumn::make('check_in')->date(),
            Tables\Columns\TextColumn::make('check_out')->date(),
            Tables\Columns\TextColumn::make('total_mad')->suffix(' MAD'),
            Tables\Columns\TextColumn::make('commission_mad')->suffix(' MAD'),
            Tables\Columns\TextColumn::make('payment_method'),
            Tables\Columns\TextColumn::make('status')->badge(),
        ])->actions([Tables\Actions\EditAction::make()]);
    }
    public static function getPages(): array {
        return [
            'index' => Pages\ListBookings::class,
            'create' => Pages\CreateBooking::class,
            'edit' => Pages\EditBooking::class,
        ];
    }
}
